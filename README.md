# CTO File Format Specification

This repository hosts the open specification for the **CTO file format** (`.cto` files): building configurations and product definitions for Configure-to-Order (CTO) building configurators. Its companion, the **CIS file format** (`.cis` files) for connection interface standards, is in [cis-specification](https://github.com/configurator-file-type/cis-specification).

The specification is developed by the **CTO Specification Working Group** of the **Configurator File Type Project**, a series of [Joint Development Foundation](https://www.jointdevelopment.org/) Projects, LLC (Linux Foundation). Membership is free and open to any party with a direct and material interest. The work originated at, and continues to be edited by, the [Center for Offsite Construction (CfOC) at NYIT](https://centerforoffsiteconstruction.org).

Specifications are licensed under the [Community Specification License 1.0](LICENSES/Community-Specification-License-1.0.md); source code is licensed under [Apache-2.0](LICENSES/Apache-2.0.txt). See [`LICENSE.md`](LICENSE.md).

**New here?** Start with the [new contributor guide](docs/ONBOARDING.md).

---

## Current version

| Specification | Latest published version | Working draft (includes unreleased changes) |
|---|---|---|
| CTO File Format | **v0.2.0**, [`spec/cto/v0.2/cto-specification-v0.2.0.md`](spec/cto/v0.2/cto-specification-v0.2.0.md) | [`spec/cto/specification.md`](spec/cto/specification.md) |

Released: April 19, 2026. See [CHANGELOG.md](spec/CHANGELOG.md) for version history, including changes merged since the last release.

Cite a published version, not the working draft. Each published version has a
frozen copy in its own version folder and, from the next release on, a tagged
[GitHub Release](https://github.com/configurator-file-type/cto-specification/releases).

---

## What this specification does

### The CTO file format (`.cto`)

The CTO file format is an open standard for encoding building configurations composed from pre-designed, pre-engineered, and pre-certified offsite construction products. Unlike traditional CAD or BIM files that represent arbitrary geometry, a `.cto` file represents a **bounded design** — a composition of catalog products that has been validated against manufacturer constraints at the point of creation.

A `.cto` file:

- References products from a known catalog rather than defining arbitrary geometry
- Encodes spatial relationships, connection topology, and interface standard conformance
- Carries pricing, scheduling, and constraint metadata
- Tracks the complete chain of custody from fabrication to acceptance
- Documents the legal transition from goods (UCC) to real property (Common Law)
- Can be validated without human review

Four `.cto` file subtypes are defined: `assembly` (a complete or partial building configuration), `element` (a single product definition such as a kitchen pod), `template` (a pre-validated assembly used as a starting point), and `entourage` (non-structural visual elements like furniture layouts).

### The companion CIS file format

CTO element files declare conformance to connection interface standards written in the CIS file format (`.cis`). The CIS specification is developed by the CIS Specification Working Group in its own repository: <https://github.com/configurator-file-type/cis-specification>.

---

## Why two specifications?

In v0.1.x, the CTO spec attempted to carry connection interface details directly within product definitions — port positions, gender assignments, MEP connection geometry, all in the product schema. This worked for simple cases but broke down as soon as real catalog authoring revealed:

- **Connection topology varies by material.** PEX uses barb-to-barb pairing with intermediate pipe; copper uses male-to-female threaded joints; PVC uses slip couplings or rubber boots. A single `gender` field can't express this richness.
- **Standards bodies and product manufacturers have different evolution cadences.** CfOC publishes interface standards on its own schedule; manufacturers update product catalogs on theirs. Coupling the two in a single spec creates artificial coordination overhead.
- **Open standards and proprietary standards coexist.** A pod might use an open CfOC standard for its building-services interface AND a proprietary catalog-internal standard for its pod-to-pod interface. Both deserve first-class machinery.

Splitting connection interface definitions into a separate `.cis` file format solves all three problems. The CTO spec becomes simpler (focused on products and assemblies); the CIS spec becomes possible (a place to publish and version connection standards independently); and the relationship between them is explicit.

---

## Repository structure

```
cto-specification/
├── README.md                     ← this file
├── Scope.md                      ← what this Working Group covers (sets patent scope)
├── Governance.md                 ← roles, decisions, approvals
├── CONTRIBUTING.md               ← the contribution rules
├── MAINTAINERS.md                ← who holds which role
├── MEMBERS.md                    ← Project Members and who has Joined this Working Group
├── Notices.md                    ← conduct contacts, license acceptances, exclusions
├── CODE_OF_CONDUCT.md
├── LICENSE.md                    ← which license applies to what
├── LICENSES/                     ← full license texts
├── docs/
│   └── ONBOARDING.md             ← new contributor guide
├── cto-file-format-intro.md      ← prose introduction to CTO (and CIS)
├── web-content-cto-file-format.md
├── spec/
│   ├── README.md                 ← how the spec files are organized
│   ├── CHANGELOG.md              ← version history, with an "Unreleased" section
│   └── cto/
│       ├── specification.md                        ← working draft: every PR edits this
│       ├── v0.1/specification.md                   ← published: CTO v0.1.6 (frozen)
│       ├── v0.2/cto-specification-v0.2.0.md        ← published: CTO v0.2.0 (frozen, latest)
│       └── v0.3.0/ …                               ← created at the next release
└── examples/                     ← example .cto files and interoperability fixtures
```

The specification has one living file, `spec/cto/specification.md`. Every change is a pull request against that file, so reviewers see exactly what changed. When the Working Group approves a new version, a Maintainer copies the living file into a new folder named for the full version (for example `spec/cto/v0.3.0/`), tags that commit (`cto-v0.3.0`) and creates a GitHub Release. Version folders, tags and Releases are never edited afterwards. See [`spec/README.md`](spec/README.md).

---

## Getting started

**If you're a software developer building a CTO parser or configurator:**
Start with the CTO spec ([`spec/cto/specification.md`](spec/cto/specification.md)). Read §1.6 for the relationship to CIS, then §3-§7 for the schema and validation rules. The CIS spec, in the [CIS repository](https://github.com/configurator-file-type/cis-specification), is normative for any CIS files referenced by CTO files; conformant parsers must be able to parse them.

**If you're a manufacturer authoring an element file (a `.cto` file with `cto_type: "element"`):**
Read CTO spec §4.1a (cto_type), §4.2 (element_meta), §4.2a (declares_interface), and §5 (Product Library Schema). Then read CIS spec §15 (Relationship to the CTO File Format), in the [CIS repository](https://github.com/configurator-file-type/cis-specification), for the division of labor between the two file types.

**If you're a standards engineer authoring a connection standard:**
Go to the [CIS repository](https://github.com/configurator-file-type/cis-specification).

**If you're a decision-maker (manufacturer leadership, AHJ, building official) evaluating these formats for adoption:**
Read [`cto-file-format-intro.md`](cto-file-format-intro.md) for a prose overview that does not require parsing JSON schemas. Then skim CTO spec §1 and §2 (Introduction and Design Principles).

---

## Design philosophy

A new design principle was added in CTO v0.2.0 (§2.8) that we want to call out here: **specifications must speak to humans as well as to parsers**. Three audiences read these specs — software developers, standards engineers, and decision-makers — and schema definitions alone serve only the first.

Every section, block, and field benefits from prose that explains its purpose, scope, and explicit exclusions in plain language. Where a concept has counterintuitive scope — for example, `clearance_zones` describes *external* clearance only, not internal product operations — the spec makes this explicit. When in doubt, we write more prose, not less.

This principle applies to contributions: when proposing changes to either spec, please draft prose-first and JSON-second.

---

## Contributing

Issues and pull requests about the CTO specification are welcome in this repository: <https://github.com/configurator-file-type/cto-specification>. Issues about the CIS specification belong in <https://github.com/configurator-file-type/cis-specification>. Earlier copies of these repositories hosted elsewhere are no longer the place to contribute.

Anyone can open a pull request; Project membership is not required. Read the [new contributor guide](docs/ONBOARDING.md) first, then [`CONTRIBUTING.md`](CONTRIBUTING.md). Contributions to the specification carry the copyright and patent commitments of the Community Specification License, within the [Scope](Scope.md) of the CTO Specification Working Group.

---

## License

Specifications: [Community Specification License 1.0](LICENSES/Community-Specification-License-1.0.md). Source code: [Apache License 2.0](LICENSES/Apache-2.0.txt). Details, and the warranty disclaimer that applies to everything here, are in [`LICENSE.md`](LICENSE.md). Implementations may be commercially proprietary or open source; the specifications themselves are open and royalty-free.

---

## Editors and contributors

Current role holders under the Project's governance are listed in [`MAINTAINERS.md`](MAINTAINERS.md).

**Editors:**
- Jason Van Nest, Center for Offsite Construction
- Mathew Ford, Center for Offsite Construction

**Contributors:**
- Michael Nolan, CfOC BIM/VDC Research Fellow
- Steve DeWitt, CfOC Senior Research Fellow
- Sam Williams, CfOC Senior Research Fellow

**Acknowledgments:**
The v0.2.0 / v0.1.3 paired release was driven by the authoring of the first real CIS files (CfOC-ICC-1220 v0.2.0) and the first element file (LBS K01-UM kitchen pod), which surfaced 22 spec observations during a single intensive session. Approximately one-third of those observations are addressed in v0.2.0; the remainder are tracked for future releases.
