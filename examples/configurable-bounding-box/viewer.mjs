// SPDX-License-Identifier: Apache-2.0
// Minimal non-normative box visual; no catalog, brand, fabrication or native CAD.
import {resolveCto} from './core.mjs';
import {readSourceOpening} from './opening-geometry.mjs';
const $=s=>document.querySelector(s);
let sourceText='',source,result,view,version=0;
function message(text,error=false){$('#notice').textContent=text;$('#notice').classList.toggle('error',error);}
function download(name,text){const u=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1500);}
function limits(){if(!Array.isArray(source.parameters?.inputs))return null;try{return resolveCto(source,Object.fromEntries(source.parameters.inputs.map(p=>[p.name,p.max]))).document.geometry.bounding_box;}catch{return null;}}
function render({fit=false}={}){
  const box=result.document.geometry.bounding_box,opening=readSourceOpening(result.document);
  $('#current-dims').textContent=`${box.width_ft} × ${box.height_ft} × ${box.length_ft} ft`;
  $('#identity').textContent=`${source.element_meta.id} @ ${source.element_meta.product_version} · CTO ${source.cto_version}`;
  $('#resolved').textContent=JSON.stringify({inputs:result.inputs,bounding_box:box,nominal_dimensions:result.document.geometry.nominal_dimensions,opening_geometry:result.document.geometry.opening_geometry??null,findings:result.rule_findings,cto_version:result.document.cto_version},null,2);
  const maximum=limits();view?.draw(box,{maximum:$('#show-limits').checked?maximum:null,nominal:$('#show-nominal').checked?result.document.geometry.nominal_dimensions:null,opening:$('#show-void').checked?opening:null});
  if(fit)view?.fit(maximum||box);window.dispatchEvent(new CustomEvent('ctoboxchange',{detail:structuredClone(result.document)}));
}
function accept(values,{fit=false}={}){const candidate=resolveCto(source,values);readSourceOpening(candidate.document);result=candidate;render({fit});for(const [name,value]of Object.entries(result.inputs)){const number=document.getElementById('number-'+name),range=document.getElementById('range-'+name);if(number)number.value=value;if(range)range.value=value;}
  message(Object.keys(result.inputs).length?'Box updated from the CTO declarations.':'Fixed CTO snapshot: current bounds shown without inventing adjustable inputs.');}
function fields(){const host=$('#inputs');host.replaceChildren();const inputs=source.parameters?.inputs??[];for(const p of inputs){const field=document.createElement('div');field.className='field';const label=document.createElement('label');label.htmlFor='number-'+p.name;label.textContent=(p.label||p.name)+' · '+p.unit;const row=document.createElement('div');row.className='field-row';const number=document.createElement('input');number.id='number-'+p.name;number.type='number';number.step=p.adjustment==='stepped'?p.step:'any';number.value=result.inputs[p.name];number.setAttribute('aria-describedby','hint-'+p.name);const range=document.createElement('input');range.type='range';range.id='range-'+p.name;range.min=p.min;range.max=p.max;range.step=p.adjustment==='stepped'?p.step:'any';range.value=result.inputs[p.name];range.setAttribute('aria-label',(p.label||p.name)+' slider');const small=document.createElement('small');small.id='hint-'+p.name;small.textContent=`${p.min}–${p.max} ${p.unit} · ${p.adjustment}${p.step?' / step '+p.step:''}`;range.oninput=()=>{try{accept({...result.inputs,[p.name]:Number(range.value)});}catch(e){message(e.message,true);range.value=result.inputs[p.name];}};row.append(number);field.append(label,row,range,small);host.append(field);}if(!inputs.length){const p=document.createElement('p');p.textContent='No adjustable parameter block. This file is displayed as a fixed box.';p.className='mono';host.append(p);}$('#apply').disabled=!inputs.length;$('#defaults').disabled=!inputs.length;}
async function load(text){const candidate=JSON.parse(text),resolved=resolveCto(candidate);readSourceOpening(resolved.document);source=candidate;sourceText=text;result=resolved;fields();render({fit:true});message('Loaded CTO. Change a declared input to resize the box.');}
async function example(){const token=++version;$('#example').disabled=true;try{const r=await fetch('./fixtures/'+$('#example').value+'.cto');if(!r.ok)throw Error('Fixture unavailable.');const text=await r.text();if(token===version)await load(text);}catch(e){message(e.message,true);}finally{if(token===version)$('#example').disabled=false;}}
$('#example').onchange=example;
$('#file').onchange=async()=>{const f=$('#file').files[0];if(!f)return;try{if(f.size>750000)throw Error('Choose a CTO smaller than 750 KB.');version++;await load(await f.text());$('#example').selectedIndex=-1;}catch(e){message(e.message,true);}finally{$('#file').value='';$('#example').disabled=false;}};
$('#apply').onclick=()=>{try{const values={};for(const p of source.parameters?.inputs??[]){const raw=document.getElementById('number-'+p.name).value;if(!raw.trim())throw Error(p.name+' needs a finite number.');values[p.name]=Number(raw);}accept(values);}catch(e){message(e.message,true);}};
$('#defaults').onclick=()=>{try{accept({});}catch(e){message(e.message,true);}};
for(const id of ['show-limits','show-nominal','show-void'])$('#'+id).onchange=()=>render();
$('#snapshot').onclick=()=>download('configured-box.cto',JSON.stringify(result.document,null,2));$('#source').onclick=()=>download('editable-box-source.cto',sourceText);
$('#fit').onclick=()=>view?.fit(result.document.geometry.bounding_box);$('#fit-limits').onclick=()=>view?.fit(limits()||result.document.geometry.bounding_box);$('#front').onclick=()=>view?.fit(result.document.geometry.bounding_box,true);$('#perspective').onclick=()=>view?.fit(limits()||result.document.geometry.bounding_box);
await example();
try{const {BoxView}=await import('./webgl.mjs');view=new BoxView($('#viewport'),$('#labels'));render({fit:true});}catch(e){$('#fallback').hidden=false;message('3D unavailable; exact bounds and CTO export are still usable. '+e.message,true);}
window.ctoBoxReview={get ready(){return !!result;},get document(){return structuredClone(result.document);},get inputs(){return structuredClone(result.inputs);},get camera(){return view?.camera.position.toArray();},get source(){return structuredClone(source);},get renderer(){return view;},load};
