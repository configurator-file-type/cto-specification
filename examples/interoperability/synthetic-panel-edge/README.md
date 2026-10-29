# Synthetic panel-edge interoperability fixture

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

## Interoperability target

Two independent configurators should be able to:

1. Parse the same CTO element and CIS files.
2. Resolve the exact product and interface versions named by the test vector.
3. Identify which product face addresses which CIS side.
4. Evaluate the named digital checks without silently supplying missing facts.
5. Return the same scoped result for each test vector.

The public repository is the review surface for the shared files. It is not a Registry database and does not define a submission API. A Registry may ingest an approved version, preserve its identity and digest, and make that exact version available to configurators.

## Fixture-local coordinate and derivation assumptions

The CIS side-plane coordinates follow CIS v0.1.3 section 6.3: the origin is the bottom-left corner when facing the side, X points right, and Y points up. This fixture maps those coordinates onto the CTO product as follows:

| CIS side-plane value | CTO product-local interpretation in this fixture |
| --- | --- |
| Side-plane X | Product-local Z across the six-inch panel edge when facing the addressed left or right face |
| Side-plane Y | Product-local Y (vertical) |
| Side-plane origin | Bottom-left corner of the addressed product face as viewed facing that face |

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

The CIS file uses `MIT` because the repository root `LICENSE` currently contains the MIT License. Other repository text refers to Apache 2.0. The maintainers should resolve that repository-level inconsistency before treating this example's license field as precedent.
