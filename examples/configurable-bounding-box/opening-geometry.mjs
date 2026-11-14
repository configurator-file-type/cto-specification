// OPTIONAL non-normative reader of existing CTO draft fields, not a new CTO schema.
// Contract: cto-specification@271b221079d6d90f98a5f064ca2e5ef2138cb5cb,
// spec/cto/specification.md §5.4. Main 0.2's prose does not define this block.
// Nothing here modifies the source artifact or invents fields inside a CTO.
export const OPENING_DRAFT_REF='271b221079d6d90f98a5f064ca2e5ef2138cb5cb';
export const OPENING_POINTER='/geometry/opening_geometry';
export const OPENING_READER_PROFILE=Object.freeze({
  status:'non-normative pinned-draft reader profile',
  source_ref:OPENING_DRAFT_REF,
  pointer:OPENING_POINTER,
  schema:Object.freeze({type:'object',required:['type','width_ft','height_ft','offset_x_ft','offset_z_ft'],properties:{type:{enum:['window','door','void']},width_ft:{type:'number',exclusiveMinimum:0},height_ft:{type:'number',exclusiveMinimum:0},offset_x_ft:{type:'number',minimum:0},offset_z_ft:{type:'number',minimum:0}},additionalProperties:true}),
});
const finite=n=>typeof n==='number'&&Number.isFinite(n),fail=m=>{throw Error(m);};

/**
 * Optional source-led wall-opening view. Does not authorize changing dimensions.
 * `offset_z_ft` is the existing field name for vertical offset from panel bottom;
 * in PR5's panel-local X/Y/Z convention it maps to local Y, NOT through-depth Z.
 * For non-wall geometry this adapter deliberately declines rather than guessing.
 * Null/missing openings are returned as null, never synthesized from subcategory.
 */
export function readSourceOpening(document,{allowLegacyDraftFields=false}={}){
  if(!document||typeof document!=='object'||document.cto_type!=='element')fail('An element CTO is required.');
  const opening=document.geometry?.opening_geometry;if(opening===undefined||opening===null)return null;
  if(document.cto_version!=='0.3.0'&&!(document.cto_version==='0.2.0'&&allowLegacyDraftFields))fail('Opening reader requires the pinned 0.3 draft profile; 0.2 main does not specify these field semantics.');
  if(document.element_meta?.category!=='wall_panel')fail('This optional opening adapter supports wall panels only; other planes require an explicit mapping.');
  if(!opening||Array.isArray(opening)||typeof opening!=='object'||!['window','door','void'].includes(opening.type))fail('Unsupported source opening shape/type.');
  for(const k of ['width_ft','height_ft','offset_x_ft','offset_z_ft'])if(!finite(opening[k])||Math.abs(opening[k])>1e6)fail('Opening '+k+' must be finite feet within the reader budget.');
  if(opening.width_ft<=0||opening.height_ft<=0||opening.offset_x_ft<0||opening.offset_z_ft<0)fail('Opening dimensions must be positive and offsets nonnegative.');
  const box=document.geometry.bounding_box;if(!box||!['width_ft','height_ft','length_ft'].every(k=>finite(box[k])&&box[k]>0&&box[k]<=1e6))fail('Opening requires a finite host bounding box.');
  if(opening.offset_x_ft+opening.width_ft>box.width_ft+1e-9||opening.offset_z_ft+opening.height_ft>box.height_ft+1e-9)fail('Source opening lies outside its host panel.');
  const origin=box.min??{x:0,y:0,z:0};if(!['x','y','z'].every(k=>finite(origin[k])&&Math.abs(origin[k])<=1e6))fail('Invalid host origin.');
  const minimum={x:origin.x+opening.offset_x_ft,y:origin.y+opening.offset_z_ft,z:origin.z};
  return {
    type:opening.type,width_ft:opening.width_ft,height_ft:opening.height_ft,
    offset_x_ft:opening.offset_x_ft,offset_z_ft:opening.offset_z_ft,
    source_pointer:OPENING_POINTER,
    source_pointers:Object.fromEntries(['type','width_ft','height_ft','offset_x_ft','offset_z_ft'].map(k=>[k,OPENING_POINTER+'/'+k])),
    source_ref:OPENING_DRAFT_REF,
    reader_status:'experimental pinned-draft interpretation, not standards adoption',
    origin_basis:box.min?'declared bounding_box.min':'presentation zero origin; source min absent',
    local_min_ft:minimum,
    local_max_ft:{x:minimum.x+opening.width_ft,y:minimum.y+opening.height_ft,z:origin.z+box.length_ft},
  };
}

// Compatibility projection for the earlier viewer; not persisted in the CTO.
export function sourceOpeningInches(document,options){
  const o=readSourceOpening(document,options);return o?{width_in:o.width_ft*12,height_in:o.height_ft*12,left_in:o.offset_x_ft*12,sill_in:o.offset_z_ft*12}:null;
}
