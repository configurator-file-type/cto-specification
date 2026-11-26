# Examples

These files support implementation and review without changing the normative CTO or CIS specifications.

## Canonical examples

Canonical single-file examples live directly under `examples/`.

| Example | Purpose |
| --- | --- |
| [`CfOC-ICC-1220-v0.2.0.cis`](./CfOC-ICC-1220-v0.2.0.cis) | Full CIS example used to exercise the published CIS schema and vocabulary. |

## Interoperability fixtures

Bounded multi-file test fixtures live under `examples/interoperability/<fixture-name>/` so their local assumptions, source records, and expected results stay together.

| Fixture | Purpose |
| --- | --- |
| [`synthetic-panel-edge`](./interoperability/synthetic-panel-edge/) | Non-normative CTO/CIS fixture for comparing two independent implementations against the same synthetic panel-edge records and test vectors. |

Fixtures are implementation aids, not adopted standards or product approvals. Any fixture-local vocabulary or interpretation must be identified inside the fixture and must not be inferred as normative specification behavior.
