# Parametric plywood wall panel fixture

## Status and scope

A non-normative, synthetic fixture for the parametric products section of the CTO
working draft (`spec/cto/specification.md` §5.8, §7.10 and §10.4). It lets two
independent implementations check that they resolve the same parametric product
to the same numbers.

It is not a manufacturer's product declaration, an adopted standard, engineering
analysis, a fabrication instruction, a price or an endorsement.

**Where the numbers come from.** The thickness (5.10 in., five layers) and the
largest billet (142 in. × 576 in.) follow a mass plywood layup (F16-5) listed in a
public evaluation report, ICC-ES ESR-4760. Everything else is invented: the
manufacturer, the interface, the 1/16 in. step and 12 in. minimums, the density,
both rules, the lift capacities, the lead time and the unit rate.

## Files

| File | Purpose |
| --- | --- |
| `example-plywood-wall-panel-5l-v0.1.0.cto` | The parametric element, at its reference size (the full billet). Satisfies P1 to P8 |
| `resolved/…-w94-h120.cto`, `…-w46-h96.cto`, `…-w142-h576.cto` | The same product resolved at three sizes (§5.8.7). Ordinary fixed-size elements that declare `cto_version` 0.2.0 |
| `EXAMPLE-INT-PLY-PLY-v0.1.0.cis` | The synthetic, catalog-internal panel-edge interface the element declares on its left and right faces |
| `test-vectors.json` | Ten cases: parameter values in, expected results out |

## What it exercises

- **Two size parameters**, `width_in` (product-local X) and `height_in` (Y, the
  strong axis), each with limits, a 1/16 in. step and a default.
- **A fixed thickness.** `thickness_in` is a constant, not an input. A different
  thickness is a different product (§5.8.1), and the `unknown-parameter` case
  checks that it is rejected.
- **Ports on a moving face.** The right edge's connection point moves with the
  width; the left edge's stays at x = 0 because it is on an origin face. Both
  move with the height. The faces and the interface they address never change.
- **Every size-dependent field bound** (§5.8.8): footprint, both statements of
  each bounding-box extent, weight, centre of gravity, connection points, lift
  points and price.
- **Rules of both kinds.** `R-SHIP-WIDTH` is a warning: it fires at the full
  billet and clears at 94 in. wide. `R-SLENDER` is an error: it rejects a panel
  more than 20 times taller than it is wide. Some combinations inside the
  min/max box, such as 12 in. × 576 in., are therefore invalid. A validator must
  not assume every corner of the box is a valid size.
- **A price expression**, `round(volume_cf * unit_rate_usd_per_cf, 2)`, with an
  invented rate.
- **A rounding tie.** At 94.5 in. wide, lift point `lp-2` lands on x = 5.90625 ft
  exactly. Rounding half away from zero gives 5.9063; rounding half to even, the
  default in many languages, gives 5.9062 and fails the `rounding-tie` case.

## Coordinates

Product-local feet with the origin at the SWB corner (§5.1): X is width, Y is
height, Z is thickness. `nominal_dimensions` is the plan footprint the
configurator reserves, width by thickness. The connection points and lift
points sit at mid-thickness, z = 0.2125 ft.

## Using the test vectors

For each case, resolve the element at `parameter_values` and compare:

- `result`: `resolved` or `rejected`.
- For a rejected case, the rule to report (V1 to V4). Message wording is not
  compared.
- For a resolved case: `configured_item_key` and `element_meta.name` as
  strings, the warning and error rules that fired, and every value in
  `bindings`, keyed by its JSON Pointer target (with the `@id` extension of
  §5.8.5). Every bound expression rounds its own result, so compare numbers
  exactly.

The resolved files are what an implementation produces for three of the cases.

## Known limits

- **The interface describes a 12 in. segment of the edge**, not the whole edge.
  The real joint runs the full height of the panel, which changes with every
  size. CIS v0.1.3 cannot describe a continuous connection or an envelope that
  changes with member size; that is left to the CIS specification (§5.8.9).
- The CIS file uses only connection signatures registered in CIS v0.1.3
  Appendix F (`bearing_surface`).
