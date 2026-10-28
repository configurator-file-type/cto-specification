# How the specification files are organized

| Path | What it is | Who edits it |
| --- | --- | --- |
| `cto/specification.md` | The CTO working draft. Always the latest merged text. | Every pull request that changes the CTO specification |
| `CHANGELOG.md` | Version history, with an "Unreleased" section for merged changes not yet published | Every normative pull request adds an entry under "Unreleased" |
| `cto/vX.Y.Z/` | Frozen copy of each published version | Nobody, once created. A Maintainer creates each one in a release pull request |
| `cto/v0.1/`, `cto/v0.2/` | Versions published before this layout was adopted, kept under their original names so existing links work | Nobody |

## Day to day

Every change to a specification is a pull request against the working draft,
`cto/specification.md`. Because it is always the same
file, reviewers see exactly which lines changed. Work in progress stays on the
pull request's branch until it is approved and merged.

## Releasing a version

When the Working Group, and then the Steering Committee, Approve the working
draft as a new version (Governance.md 6.11), a Maintainer:

1. Opens a release pull request that:
   - copies the working draft, unchanged, to a new folder named for the full
     version, e.g. `cto/v0.3.0/cto-specification-v0.3.0.md`;
   - moves that specification's "Unreleased" changelog entries under a new
     version heading;
   - updates the "latest published version" link in the top-level README.
2. Merges it after one Maintainer approval. The text was already Approved, so
   there is no waiting period, and the pull request must not change it.
3. Tags the merge commit `cto-v0.3.0`.
4. Creates a GitHub Release for the tag, with notes from the changelog and the
   disclaimer from `LICENSE.md`.

## Rules for version folders

- Named for the **full** version (`v0.3.0/`, `v0.3.1/`), never the minor version
  (`v0.3/`), so a patch release never overwrites an earlier release.
- Created once, then never changed. A correction goes into the working draft and
  ships in the next version.
- Tags and Releases are never moved or edited either.

## What to cite

Cite a published version: its version folder or its Release page. The working
draft on `main` can contain changes that have not been published yet.
