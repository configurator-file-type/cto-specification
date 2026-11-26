# Synthetic panel-edge interoperability fixture

## Start here: the panel with Z up

In the architectural view, the panel stands **8 ft high along Z**, is **4 ft wide along X**, and is **6 in deep along Y**. The two alignment ports are halfway up the panel and halfway through its depth. Place a second panel 4 ft to the right: its left port meets the first panel's right port at **(4, 0.25, 4) ft**.

Open [the Z-up example data](z-up-view.json) to compare the bounds, both ports, and an off-center test. The same points in the two frames are:

| Point (feet, from the south-west-bottom corner) | Architectural XYZ: width, depth, height | CTO v0.2 product-local XYZ: width, height, depth |
| --- | --- | --- |
| Opposite corner | (4, 0.5, 8) | (4, 8, 0.5) |
| Right port | (4, 0.25, 4) | (4, 4, 0.25) |
| Left port | (0, 0.25, 4) | (0, 4, 0.25) |

The example uses Z for height; the [CTO v0.2 exchange record](example-solid-wall-panel-v0.1.0.cto) still uses its specified product-local axes. To convert either way, keep width and exchange the depth and height slots: `(x,y,z) → (x,z,y)`. This reorders named measurements with positive depth; it is **not** a 3D rotation or a glTF transform. See the [CTO v0.2 geometry convention](../../../spec/cto/v0.2/cto-specification-v0.2.0.md).

## Status and scope

This is a non-normative, independently authored synthetic fixture for testing parser and application behavior. It is not an adopted CfOC standard, a manufacturer product declaration, engineering analysis or approval, construction or fabrication instruction, commercial offer, or endorsement of any implementation.

Pass, fail, and indeterminate apply only to the named digital checks and stated inputs. A pass does not establish physical fit, structural capacity, code compliance, constructability, safety, manufacturability, or professional approval. Missing evidence produces an indeterminate result.

The fixture intentionally contains no customer, project, company, or real-manufacturer data. Its dimensions, identifier, interface, and port are synthetic. Native CAD files and private product rules do not belong in this example.

## Files

| File | Purpose |
| --- | --- |
| `example-solid-wall-panel-v0.1.0.cto` | One synthetic wall-panel element that declares the same panel-edge interface on its left and right faces. |
| `EXAMPLE-INT-PANEL-PANEL-v0.1.0.cis` | A draft catalog-internal CIS with two complementary sides and one alignment port. |
| `test-vectors.json` | Non-normative inputs and expected outcomes for two independent implementations. |
| `z-up-view.json` | Expected architectural coordinates in feet, including an off-center mirrored pair. A comparison file, not a CTO/CIS record. |

## Interoperability target

Two independent configurators should be able to:

1. Parse the same CTO element and CIS files.
2. Resolve the exact product and interface versions named by the test vector.
3. Identify which product face addresses which CIS side.
4. Evaluate the named digital checks without silently supplying missing facts.
5. Return the same scoped result for each test vector.

The public repository is the review surface for the shared files. It is not a Registry database and does not define a submission API. A Registry may ingest an approved version, preserve its identity and digest, and make that exact version available to configurators.

## Fixture-local coordinate and derivation assumptions

The CIS port is a **2D face measurement in inches**, not a 3D point. In [CIS v0.1.3 §§6.3–6.4](../../../spec/cis/v0.1/v0.1.3/cis-specification-v0.1.3.md), its fields are called `x` and `y`. Here we call them `u` (rightward) and `v` (upward) as you look at each face from outside. Do not rename the CIS fields. The origin is the bottom-left corner of the face being viewed.

| Addressed face | Architectural XYZ in feet, from that panel's own origin |
| --- | --- |
| Right (side A) | `(4, u/12, v/12)` |
| Left (side B) | `(0, (6-u)/12, v/12)` |

**Check the direction, not just the center.** For the diagnostic point (1.5, 24) in on side A, CIS mirroring gives (4.5, 24) in on side B. The table then gives (4, 0.125, 2) ft on the first panel and (0, 0.125, 2) ft on the second. Translate the second panel by (+4, 0, 0) ft: the points coincide, with both 2 ft above the base. This deliberately asymmetric check catches a missing or double mirror that the centered port cannot reveal.

This mapping is local to the fixture because CTO v0.2.0 and CIS v0.1.3 do not yet define a normative face-to-side coordinate transform.

CIS v0.1.3 section 6.4 makes `mirror_of` generative: the derived port position is `(W - x, y)` and a gendered connection signature becomes its registered complement. For this fixture, the derived `side_b` port retains the source `port_id` of `alignment_center` for lookup. Because the source port is centered on the six-inch side, `(3, 48)` remains `(3, 48)` after mirroring, while `alignment_pin_F` becomes `alignment_pin_M`. The `alignment_pin_F` and `alignment_pin_M` complementary pair is registered in CIS v0.1.3 Appendix F. Retaining the source port identifier is a fixture-local assumption pending a normative rule.

The port-level `tolerance_in` is the only positional tolerance used by these test vectors. No precedence between global and port-specific tolerances is asserted.

The CTO `geometry.bounding_box` uses the specification meaning: the physical shipping envelope of the product as manufactured. Its dimensions are synthetic fixture data and do not constitute fabrication instructions, engineering approval, or a claim about a real product.

## Test-vector interpretation

`test-vectors.json` is a fixture-specific sidecar, not part of the CTO or CIS specifications. Its result codes are local to this example.

- `pass`: the referenced files are available, the declared faces address complementary CIS sides, and the synthetic alignment port is within the stated tolerance.
- `fail`: the named digital check has enough information to determine that the configuration violates a declared rule.
- `indeterminate`: a required source or fact is unavailable, so the evaluator cannot truthfully return pass or fail.

A failed rotation-lock check is a design-time warning under CTO v0.2.0 and CIS v0.1.3. It blocks manufacturing-ready export but does not prevent saving an exploratory design.

## Mapping a contributed panel

A product owner can use this fixture as a bounded intake pattern:

1. Provide the native source package through an agreed restricted file handoff.
2. Declare the product identity, version, dimensions, and disclosure rights.
3. Replace the synthetic element facts only with publisher-approved facts.
4. Define or reference the CIS used by each exposed product face.
5. Keep unknown product or connection facts explicit.
6. Run the same test vectors in both configurators.
7. Submit the reviewed CTO/CIS records to the Registry as exact versions.

The source CAD remains a source artifact. It is not automatically a public Registry record, and geometry parsing does not establish product identity, interface meaning, engineering approval, or publication rights.

## Repository license note

The draft CIS still declares `MIT`. The [upstream license policy](https://github.com/configurator-file-type/cto-specification/blob/main/LICENSE.md) distinguishes specification examples from source code. The Z-up example does not settle the fixture's classification or relicense it; maintainers should confirm the correct treatment before merge.
