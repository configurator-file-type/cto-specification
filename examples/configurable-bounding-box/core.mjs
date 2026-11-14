// SPDX-License-Identifier: Apache-2.0
// Non-normative bounded resolver for the pinned experimental CTO parameter profile.
const EPS = 1e-9;
const fail = message => { throw new Error(message); };
const finite = v => typeof v === 'number' && Number.isFinite(v);
const own = (o,k) => Object.hasOwn(o,k);
const forbidden = k => ['__proto__','constructor','prototype'].includes(k);
const nameOK = k => typeof k==='string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(k) && !forbidden(k) && !['true','false','null','and','or','not','min','max','abs','floor','ceil','round'].includes(k);
export function canonical(value) {
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number') return finite(value) ? JSON.stringify(value) : fail('Non-finite JSON number.');
  if (Array.isArray(value)) return '['+value.map(canonical).join(',')+']';
  if (!value || typeof value !== 'object') fail('Unsupported JSON value.');
  return '{'+Object.keys(value).sort().map(k => { if(forbidden(k))fail('Unsafe object key.');return JSON.stringify(k)+':'+canonical(value[k]); }).join(',')+'}';
}
export async function sha256(value) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(b=>b.toString(16).padStart(2,'0')).join('');
}
export function decimal(v) {
  if(!finite(v))fail('Non-finite key value.');
  const s=String(Object.is(v,-0)?0:v);if(!/[eE]/.test(s))return s;
  const [m,e]=s.toLowerCase().split('e'),sign=m.startsWith('-')?'-':'',a=m.replace('-','').split('.'),digits=a.join(''),p=a[0].length+Number(e);
  return sign+(p<=0?'0.'+'0'.repeat(-p)+digits:p>=digits.length?digits+'0'.repeat(p-digits.length):digits.slice(0,p)+'.'+digits.slice(p));
}
export function exactRound(x,n=0) {
  if(!finite(x)||!Number.isInteger(n)||n<0||n>10)fail('round requires finite x and integer precision 0–10.');
  if(x===0)return 0;
  const b=new DataView(new ArrayBuffer(8));b.setFloat64(0,Math.abs(x));const bits=b.getBigUint64(0),e=Number((bits>>52n)&2047n),mant=(bits&((1n<<52n)-1n))+(e?1n<<52n:0n),power=(e?e-1023:1-1023)-52;
  let numerator=mant*10n**BigInt(n),denominator=1n;if(power>=0)numerator<<=BigInt(power);else denominator<<=BigInt(-power);
  let q=numerator/denominator;if(numerator%denominator*2n>=denominator)q++;
  const r=Math.sign(x)*Number(q)/10**n;return finite(r)?r:fail('Non-finite round result.');
}
export function expression(source,env) {
  if(typeof source!=='string'||source.length>2048)fail('Expression length exceeds the review budget.');
  const tokens=[];let i=0;
  while(i<source.length){const s=source.slice(i),m=/^(?:\s+|(?:\d+(?:\.\d*)?|\.\d+)|[A-Za-z_][A-Za-z0-9_]*|<=|>=|==|!=|[+\-*/(),<>])/.exec(s);if(!m)fail('Unsupported expression token at '+i);i+=m[0].length;if(!/^\s/.test(m[0]))tokens.push(m[0]);if(tokens.length>512)fail('Expression token budget exceeded.');}
  let pos=0,depth=0,ops=0;const next=()=>tokens[pos++],peek=()=>tokens[pos];
  const num=x=>x===null?null:finite(x)?x:fail('Numeric operand required.');
  const bool=x=>x===null?null:typeof x==='boolean'?x:fail('Boolean operand required.');
  const prec={or:1,and:2,'==':3,'!=':3,'<':4,'<=':4,'>':4,'>=':4,'+':5,'-':5,'*':6,'/':6};
  const apply=(op,a,b)=>{
    if(++ops>512)fail('Expression operation budget exceeded.');
    if(op==='and'||op==='or'){bool(a);bool(b);if(op==='and')return a===false||b===false?false:a===null||b===null?null:true;return a===true||b===true?true:a===null||b===null?null:false;}
    num(a);num(b);if(a===null||b===null)return null;
    if(op==='==')return Math.abs(a-b)<=EPS;if(op==='!=')return Math.abs(a-b)>EPS;
    if(op==='<')return a<b-EPS;if(op==='<=')return a<=b+EPS;if(op==='>')return a>b+EPS;if(op==='>=')return a>=b-EPS;
    if(op==='/'&&b===0)fail('Division by zero.');
    const r=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;return finite(r)?r:fail('Non-finite expression result.');
  };
  function parse(min=0){if(++depth>48)fail('Expression nesting budget exceeded.');let t=next(),a;
    if(t==='-'||t==='+'||t==='not'){const v=parse(7);a=t==='not'?(bool(v)===null?null:!v):(num(v)===null?null:t==='-'?-v:v);}
    else if(t==='('){a=parse();if(next()!==')')fail('Missing closing parenthesis.');}
    else if(t==='null')a=null;else if(t==='true'||t==='false')a=t==='true';
    else if(t&&/^(?:\d|\.)/.test(t))a=Number(t);
    else if(t&&/^[A-Za-z_]/.test(t)){
      if(peek()==='('){next();const args=[];if(peek()!==')'){do{args.push(parse());if(peek()!==',')break;next();}while(true);}if(next()!==')')fail('Missing function close.');
        const arity={abs:[1,1],floor:[1,1],ceil:[1,1],round:[1,2],min:[1,32],max:[1,32]}[t];if(!arity||args.length<arity[0]||args.length>arity[1])fail('Unknown function or invalid arity.');args.forEach(num);
        a=args.includes(null)?null:t==='round'?exactRound(args[0],args[1]??0):Math[t](...args);
      }else{if(!own(env,t)||forbidden(t))fail('Unknown or forward-referenced symbol: '+t);a=env[t];}
    }else fail('Expected expression operand.');
    while(own(prec,peek())&&prec[peek()]>=min){const op=next(),b=parse(prec[op]+1);a=apply(op,a,b);}
    depth--;if(a!==null&&typeof a!=='boolean'&&!finite(a))fail('Non-finite result.');return a;
  }
  const result=parse();if(pos!==tokens.length)fail('Unexpected trailing expression token.');return result;
}
const protectedNames=new Set(['cto_version','cto_type','element_meta','catalog_reference','parameters','declares_interface','interface_roles','id','option_id','face','side_addressed','manufacturer','category','subcategory']);
export function pointerSlot(document,pointer) {
  if(typeof pointer!=='string'||!pointer.startsWith('/')||pointer.length>500)fail('Invalid binding pointer.');
  const parts=pointer.slice(1).split('/').map(p=>{if(/~(?![01])/.test(p))fail('Invalid JSON pointer escape.');return p.replace(/~1/g,'/').replace(/~0/g,'~');});
  if(parts.some(p=>forbidden(p)||protectedNames.has(p)||/cis_id|cis_version|_ref$|_refs$/.test(p)))fail('Binding targets a protected identity or interface field.');
  let obj=document;
  for(let n=0;n<parts.length;n++){
    let key=parts[n];if(Array.isArray(obj)){if(key.startsWith('@')){const id=key.slice(1),hits=obj.map((v,i)=>v?.id===id||v?.option_id===id?i:-1).filter(i=>i>=0);if(hits.length!==1)fail('Missing or ambiguous @id binding target.');key=hits[0];}else if(!/^(0|[1-9]\d*)$/.test(key))fail('Invalid array index.');}
    if(!obj||typeof obj!=='object'||!own(obj,key))fail('Binding target does not exist: '+pointer);
    if(n===parts.length-1){if(obj[key]!==null&&!finite(obj[key]))fail('Binding target is not numeric or null.');return {object:obj,key};}obj=obj[key];
  }
  fail('Empty binding pointer.');
}
export function resolveCto(source,values={}) {
  if(!source||source.cto_type!=='element'||!['0.2.0','0.3.0'].includes(source.cto_version))fail('This review accepts CTO 0.2.0 fixed elements or 0.3.0 draft elements only.');
  if(canonical(source).length>750000)fail('Source exceeds 750 KB review budget.');
  const hasParameters=own(source,'parameters')&&source.parameters!==null;
  const fixedReference=!hasParameters||(source.cto_version==='0.2.0'&&Array.isArray(source.parameters));
  if(source.cto_version==='0.2.0'&&!fixedReference)fail('Structured draft parameters cannot be relabeled as CTO 0.2.0.');
  if(fixedReference){
    if(!values||Array.isArray(values)||typeof values!=='object'||Object.keys(values).length)fail('V1 Fixed-size sources have no adjustable inputs in this review.');
    const b=source.geometry?.bounding_box;if(!b||!['width_ft','height_ft','length_ft'].every(k=>finite(b[k])&&b[k]>0&&b[k]<=1e6)||typeof source.element_meta?.id!=='string'||!source.element_meta.id.trim()||typeof source.element_meta?.product_version!=='string'||!source.element_meta.product_version.trim())fail('Fixed product needs an exact identity and finite envelope.');
    if(b.min!==undefined||b.max!==undefined){for(const endpoint of ['min','max'])if(b[endpoint]!==undefined&&(!b[endpoint]||!['x','y','z'].every(axis=>finite(b[endpoint][axis])&&Math.abs(b[endpoint][axis])<=1e6)))fail('Fixed product has invalid envelope extents.');if(b.min&&b.max)for(const [key,axis]of [['width_ft','x'],['height_ft','y'],['length_ft','z']])if(Math.abs(b.max[axis]-b.min[axis]-b[key])>1e-4)fail('Fixed envelope dimensions and extents disagree.');}
    return {document:structuredClone(source),inputs:{},configured_item_key:source.element_meta.id+'@'+source.element_meta.product_version,bindings:{},rule_findings:[{rule_id:'FIXED-REFERENCE',severity:'info',status:'not_evaluated',message:'Fixed envelope reference; no dimensional rules were inferred. Legacy option arrays are not dimension rules. Authored model geometry is not regenerated.'}],derived:{},engineering_approval:false};
  }
  const p=source.parameters;if(!p||Array.isArray(p)||!Array.isArray(p.inputs))fail('Structured draft parameters required. Legacy parameter arrays are not reinterpreted.');
  if(!values||Array.isArray(values)||typeof values!=='object')fail('Input values must be an object.');
  for(const [key,max]of [['inputs',32],['derived',128],['rules',128],['bindings',256]])if(!Array.isArray(p[key]??[])||(p[key]?.length??0)>max)fail('Invalid or excessive '+key);
  const env=Object.create(null),inputs=Object.create(null),names=new Set();
  for(const v of p.inputs){if(!nameOK(v.name)||names.has(v.name)||!finite(v.min)||!finite(v.max)||Math.abs(v.min)>1e6||Math.abs(v.max)>1e6||v.min>v.max||!finite(v.default)||!['continuous','stepped'].includes(v.adjustment))fail('Invalid input declaration or values outside the review budget.');names.add(v.name);}
  for(const k of Object.keys(values))if(!names.has(k))fail('V1 Unknown input: '+k);
  for(const v of p.inputs){const x=own(values,v.name)?values[v.name]:v.default;if(!finite(x)||x<v.min||x>v.max)fail('V2 '+v.name+' must be finite and within ['+v.min+', '+v.max+'].');
    const grid=(x-v.min)/v.step;
    if(v.adjustment==='stepped'&&(!finite(v.step)||v.step<=0||!finite(grid)||Math.abs(grid-Math.round(grid))>EPS))fail('V3 '+v.name+' must be on the '+v.step+' '+v.unit+' step from '+v.min+'.');env[v.name]=inputs[v.name]=x;}
  if(!p.constants||Array.isArray(p.constants)||Object.keys(p.constants).length>128)fail('Invalid constants.');
  for(const [k,v]of Object.entries(p.constants)){if(!nameOK(k)||names.has(k)||(v!==null&&!finite(v)))fail('Invalid or duplicate constant.');env[k]=v;names.add(k);}
  for(const d of p.derived??[]){if(!nameOK(d.name)||names.has(d.name))fail('Invalid or duplicate derived name.');env[d.name]=expression(d.expr,env);names.add(d.name);}
  const findings=[],ruleIds=new Set();for(const rule of p.rules??[]){if(!rule.id||ruleIds.has(rule.id)||!['error','warning','info'].includes(rule.severity))fail('Invalid rule.');ruleIds.add(rule.id);const r=expression(rule.expr,env);if(r!==null&&typeof r!=='boolean')fail('Rule must return boolean or null.');if(r!==true){const finding={rule_id:rule.id,severity:rule.severity,status:r===null?'not_evaluated':'failed',message:rule.message};findings.push(finding);if(rule.severity==='error')fail('V4 '+rule.id+': '+rule.message);}}
  const document=structuredClone(source),bindings={},targets=new Set();for(const binding of p.bindings??[]){if(targets.has(binding.target))fail('Duplicate binding target.');targets.add(binding.target);const slot=pointerSlot(document,binding.target),v=expression(binding.expr,env);if(v!==null&&!finite(v))fail('Binding result must be numeric or null.');slot.object[slot.key]=v;bindings[binding.target]=v;}
  if(typeof p.label_template==='string'){if(p.label_template.length>2000)fail('Label too long.');document.element_meta.name=p.label_template.replace(/\{([^}]+)\}/g,(_,k)=>own(inputs,k)?decimal(inputs[k]):fail('Unknown label input.'));}
  delete document.parameters;
  const b=document.geometry?.bounding_box;if(!b||!['width_ft','height_ft','length_ft'].every(k=>finite(b[k])&&b[k]>0&&b[k]<=1e6))fail('Resolved envelope must have positive finite dimensions within the review budget.');
  for(const [k,axis]of [['width_ft','x'],['height_ft','y'],['length_ft','z']])if(!finite(b.min?.[axis])||!finite(b.max?.[axis])||Math.abs(b.max[axis]-b.min[axis]-b[k])>1e-4)fail('Envelope dimensions and extents disagree.');
  const id=source.element_meta?.id,version=source.element_meta?.product_version;if(typeof id!=='string'||typeof version!=='string')fail('Product identity/version required.');
  const key=id+'@'+version+'?'+Object.keys(inputs).sort().map(k=>k+'='+decimal(inputs[k])).join('&');
  return {document,inputs:{...inputs},configured_item_key:key,bindings,rule_findings:findings,derived:{...env},engineering_approval:false};
}
