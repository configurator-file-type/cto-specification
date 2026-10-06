# Scope

> **Status: DRAFT for Working Group approval.** Each Working Group Charter
> (JDF v.6.0, 2026-06-23) says the Working Group Scope is "as set forth in the
> Working Group repository's Scope.md file" and gives the initial text. That
> initial text is reproduced word for word in Section 1 below. Everything
> after it is interpretation, added so that contributors and their counsel can
> tell what is and is not covered. Remove this note on merge.

This file sets the Scope of the **CTO Specification Working Group**, which develops the
CTO File Format Specification (`.cto`) in this repository. Under the
Community Specification License 1.0, the Scope establishes the outer bounds of
each Contributor's and Licensee's patent commitment. Material outside the
Scope is not subject to the licensing obligations of the Working Group.

Every pull request to this repository is a Contribution to the
CTO Specification Working Group only. The CIS Specification Working Group develops the
CIS File Format Specification in its own repository, with its own
Scope: <https://github.com/configurator-file-type/cis-specification/blob/main/Scope.md>.

Any changes of Scope are not retroactive. A change to the Scope text in 1.1 is a
change to the basis on which existing Working Group Participants made
their commitments; it requires the Approval of the Working Group and of the
Steering Committee, and notice to every Working Group Participant.

---

## 1. CTO Specification Working Group

### 1.1 Scope

As established by the CTO Specification Working Group Charter:

> Develop, maintain, and version the .CTO file format specification, including
> schema definitions, validation rules, metadata conventions, sample files, and
> conformance documentation, for use in encoding configurations and product
> definitions in configure-to-order modular building workflows.

### 1.2 What this includes

The Working Group reads the `.CTO` file format specification as comprising the
specification of:

1. **File structure.** The structure, serialization, encoding, file extension
   and media type of `.cto` files, and the file subtypes the format defines
   (at the time of writing: `assembly`, `element`, `template` and `entourage`).
2. **Product definitions.** The data model and schema by which a single product
   is described, including product identity and metadata (such as identifiers,
   pricing, lead time, warranty, tolerances and environmental attributes);
   references to geometry and the coordinate, origin, orientation and
   face-labeling conventions that make those references unambiguous; nominal
   and actual dimensions; and the constraints that govern how the product may be
   placed, oriented and configured.
3. **Assemblies.** The data model and schema by which products are composed into
   a building configuration, including product instances, placement, spatial
   relationships, grids, connection topology, bills of materials, and
   fulfillment and scheduling data.
4. **Interface declaration.** The mechanism by which a product declares
   conformance to one or more connection interface standards by reference, and
   binds its faces to the sides of a connection plane, so that software can
   determine whether two products may be joined.
5. **Compliance and rule data.** The representation of code-compliance
   parameters and other rule inputs carried in a file so that they can be
   checked by software.
6. **Chain of custody.** The representation of lifecycle and transfer events,
   the parties to them, and the recorded transition of a product from goods to
   real property.
7. **Versioning and extension.** Version identification, compatibility rules and
   extension mechanisms for the format and for files that use it.
8. **Validation and conformance.** Validation rules for `.cto` files and
   conformance requirements for software that reads, writes or validates them.
9. **Supporting materials.** Schemas, example files, test files, conformance
   test suites, glossaries and explanatory documents that support the items
   above.

"Configure-to-order modular building workflows" is read by reference to what the
format does, not by building type or material. Any product that is configured
from a catalog and joined to other products through declared interfaces is a
subject the format may describe, whether volumetric, panelized, structural or a
component, and whatever the occupancy of the building.

### 1.3 What this does not include

The following are outside the Scope of the CTO Specification Working Group:

1. The CIS file format, which is the Scope of the CIS Specification Working
   Group (https://github.com/configurator-file-type/cis-specification).
2. The technical content of any connection interface standard, open or
   proprietary, that a `.cto` file references.
3. The design, engineering, manufacture, assembly or installation of any
   physical building product, connection, tool or construction method. The
   format describes products; it does not specify how they are made or built.
4. Three-dimensional geometry file formats and geometry kernels. The format
   references geometry held in other formats and does not define them.
5. The internal design of any software, including configurators, registries,
   manufacturing, estimating or analysis systems: their algorithms, user
   interfaces, architecture and business logic. Only the behavior required for
   conformance under item 8 above is in Scope.
6. The operation, governance or commercial terms of any product registry,
   catalog, marketplace or certification program, and the product data any
   manufacturer publishes using the format.
7. The content of building codes, contracts, warranties or law. The format may
   carry data about these; it does not define them.
