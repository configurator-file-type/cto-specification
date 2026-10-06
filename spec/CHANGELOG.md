# CHANGELOG

This file tracks the version history of the CTO File Format Specification.
Entries are ordered most-recent-first.

Until October 2026 the CTO and CIS specifications shared one repository and one
changelog. The CIS entries now live in the CIS repository: <https://github.com/configurator-file-type/cis-specification/blob/main/spec/CHANGELOG.md>.

For the history of versions that predate this changelog, see
`spec/cto/v0.1/specification.md` (CTO v0.1.6 and earlier).

Every pull request that changes the specification adds an entry under
**Unreleased**, linking the pull request. When a version is published, those
entries move under a new version heading.

---

## Unreleased

### Added

- **§5.8 Parametric Products**: an optional `parameters` block lets one element file describe every size of a product within limits the manufacturer sets: size parameters with limits and step, a reference size that keeps files readable by older parsers, rules for combinations, bindings that update every size-dependent field, a small expression language, resolution to a fixed-size element, and the configured item key (#4)
- **§7.10 Parameter Validity**: rules P1 to P8 for element files and V1 to V5 for placed instances (#4)
- **§10.4 Parametric Element File**: worked example, with the complete files and test vectors in `examples/interoperability/parametric-plywood-wall-panel/` (#4)
- **§1.3 Terminology**: Parametric Product, Size Parameter, Reference Size, Configured Item (#4)

### Changed

- **§2.1 to §2.5, §3.4, §4.2, §4.4d to §4.8, §5.1, §5.4, §6.4, §7.1, §7.5, §7.6, §8.3, §11.1**: what each requirement means for a parametric product. `parameter_values` added to floor cartridge, placed element and roof element instances; `parameter_values` and `configured_item_key` added to pricing line items, production slots and load manifests (#4)
- **§8.2 Compatibility**: parsers SHOULD warn when opening a file with a higher MINOR version than they implement (#4)

### Editorial

- **Whole specification**: the sections that v0.2.0 incorporated by reference ("unchanged from v0.1.6") are now written out in full in the working draft, so the next published version is one complete document. No requirement changed.

---

## [CTO] v0.2.0 — April 19, 2026

**CIS Companion Specification.** Major release introducing the CIS file format as a companion specification, formalizing how CTO element files declare conformance to CIS-defined connection standards.

### Added

- **§1.6 Companion Specifications** — explains the CIS file format, the architectural relationship between CTO and CIS, and the design principle that they are siblings (not parent/child)
- **§2.8 Specifications Speak to Humans** — new design principle: specifications must serve software developers, standards engineers, AND decision-makers (manufacturers, AHJs, building officials). Schema definitions alone serve only the first audience
- **§4.2 `element_meta` block** — distinct metadata block for `cto_type:"element"` files, separate from `project_meta` (which documents user-created assemblies)
- **§4.2a `declares_interface` block** — top-level array of CIS standard references, formalizing what was previously a forward-pointer ambiguity. Includes a Multi-Standard Elements subsection documenting common patterns
- **§10.3 Multi-Standard Element worked example** — the K01-UM kitchen pod, which declares conformance to both `CfOC-ICC-1220` (back face) and `LBS-INT-UTIL-KIT` (left/right faces)
- **§1.3 Terminology** — new entries for CIS File, Connection Plane, and Product-Local Face Labels

### Changed

- **§5.1 Product Library Schema** — removed `gender` from `connection_points` (gender now lives in CIS files via `connection_signature` per CIS spec §6); added `cis_port_id_ref`; substantially rewrote prose throughout to clarify ambiguous fields per the new §2.8 design principle
- **§5.7 Interface Standard Conformance** — substantially rewritten to frame `interface_roles` as a rotation-lock validation rule (not just informational metadata), with a worked bath-pod-rotation example
- **§7.8 Interface Compatibility validation** — rewritten to incorporate CIS-aware validation (port-pair signature compatibility, version negotiation per CIS spec §9.3)
- **§8.3 Migration** — added migration guidance from v0.1.6 to v0.2.0 for both assembly and element files
- **§1.5 Related Standards** — added CIS File Format and CfOC-ICC-1220-S to the table

### Clarified (8 in-scope spec observations from the authoring session)

- `bounding_box.min/max` coordinates are product-local feet, distinct from GLB Y-up coordinates (observation #2)
- Face labels (`front`, `back`, `left`, `right`, `top`, `bottom`) are product-local, NOT real-world compass directions (observation #3)
- `clearance_zones` describes EXTERNAL clearance requirements only — space outside the product envelope reserved for operation or access. NOT for documenting internal product operations like appliance door swings (observation #4)
- `interface_roles` is the primary mechanism preventing invalid product rotations at the configurator (observation #15)

### Deferred to v0.2.1 or later

- Coupler product class formalization (observation #7)
- Services chain validation (observation #12)
- Interface-carrier products documentation pattern (observation #13)
- `field_built_element` parent abstraction
- Base/foundation and rigging views in Drafting Geometry layer
- Stairwell / `conceptual_objects` reconciliation
- Formal JSON Schema (Appendix B)

---

## [CTO] v0.1.6 — April 17, 2026

(See `spec/cto/v0.1/specification.md` for the v0.1.6 CTO spec. Pre-v0.2.0 CHANGELOG entries are preserved in the file's git history; future entries appear here.)

### Added (summary)

- Entourage product type (`cto_type: "entourage"`)
- Stairwell Bounding Volume — first-class hosting element for prefab staircases
- Level Datum Architecture with Roof Prism — levels as first-class abstract hosts independent of floor plates

### Changed

- Unified Party Schema standardized across `chain_of_custody`, `fulfillment_plan`, and chain-of-custody actor fields
- Sided Interface Roles introduced (foundation for v0.2.0's full CIS coexistence work)

---

## Earlier versions

For CTO versions earlier than v0.1.6, see the git history of `spec/cto/v0.1/specification.md`.
