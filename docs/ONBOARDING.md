# New contributor guide

This guide takes you from "interested" to "first pull request merged". It
assumes you have a GitHub account and know roughly what a pull request is. You
do not need to install anything; every step can be done in the browser.

The full rules are in [`CONTRIBUTING.md`](../CONTRIBUTING.md). This guide only
tells you what to do, in order.

## What this project is

Two open file formats for configure-to-order (CTO) construction:

- **`.cto`** describes a building product, or a building assembled from
  products. It carries geometry references, product data, compliance data and a
  chain-of-custody record from factory to final inspection.
- **`.cis`** describes a connection interface standard: the two sides of a
  connection plane, the ports on each side, and what may mate with what. A
  `.cto` product declares which `.cis` standards it conforms to.

The closest analogy is manufacturing CAD, where part files nest into assembly
files. The difference is the joints. A joint in a `.cto` file is never invented
from geometry. It is a declared conformance to a published `.cis` standard,
which software can check.

The formats are developed by the CTO Specification Working Group and the CIS
Specification Working Group of the Configurator File Type Project, a Joint
Development Foundation (Linux Foundation) project. Each has its own
repository. **This one is the CTO Specification Working Group's**; the
CIS specification is at <https://github.com/configurator-file-type/cis-specification>. The work began at the Center
for Offsite Construction at NYIT. Membership is free and open to any party with
a direct and material interest.

## Step 1: Read for twenty minutes

| If you are | Read |
| --- | --- |
| Anyone | [`cto-file-format-intro.md`](../cto-file-format-intro.md), then [`Scope.md`](../Scope.md) |
| A software developer | CTO spec sections 1.6 and 3 to 7 |
| A standards engineer | The CIS spec end to end, then the example `.cis` file, both in the [CIS repository](https://github.com/configurator-file-type/cis-specification) |
| A manufacturer | CTO spec sections 4.1a, 4.2, 4.2a and 5, then CIS spec section 15 ([CIS repository](https://github.com/configurator-file-type/cis-specification)) |

## Step 2: Join the conversation

1. Join Slack: **[TBD: link or who to ask]**. Introduce yourself in
   **[TBD: channel]** and say which of the rows above describes you.
2. Click **Watch** on this repository (and on the [CIS repository](https://github.com/configurator-file-type/cis-specification) if
   you will work on both) and choose "All activity", or "Custom" with
   issues and pull requests.
3. Meetings: **[TBD: when, how to get the invitation, where notes are kept]**.
   Each Working Group's Lead, listed in [`MAINTAINERS.md`](../MAINTAINERS.md),
   can add you to the invitation.

You can read everything and ask questions right away. Read Step 3 before you
open your first pull request.

## Step 3: Know what you are agreeing to

Anyone can open a pull request; you do not need to be a Member or sign anything
first. Opening one makes you a Participant in the Working Group and is your
agreement that what you submit is a Contribution under the
[Community Specification License 1.0](../LICENSES/Community-Specification-License-1.0.md),
with copyright and patent commitments limited to [`Scope.md`](../Scope.md).
That is what makes the formats safe for everyone to implement.

1. **Make sure the work is yours to give.** If it belongs to your employer, you
   must be authorized to contribute it for them. If they hold patents in this
   area, show their IP counsel [`Scope.md`](../Scope.md) first: the commitment is
   limited to the Scope, and the license allows 45 days after a Contribution to
   exclude a patent claim.
2. **Name every copyright owner** of what you submit in the pull request
   template.

### Optional: make your organization a Member

Members hold the Working Group's roles (Maintainer, Editor, Working Group Lead)
and vote when it cannot reach consensus. Membership is free, and the paperwork
is once per organization.

1. **Look for your organization in [`MEMBERS.md`](../MEMBERS.md).** If it is
   there, go to step 4 of this list.
2. **Get the Membership Agreement signed.** Send the Membership Agreement
   Package (**[TBD: link]**) to whoever can sign contracts for your
   organization, and to its IP counsel if it has patents in this area, together
   with [`Scope.md`](../Scope.md). Things they will want to know: there is no
   fee; every Member signs identical documents, so redlines are not accepted;
   the patent commitment is limited to the Scope; a Member can withdraw at any
   time by written notice to the Chairperson, keeping the commitments already
   made. If you are an individual, you are the signatory.
3. **Wait for the countersignature.** The Steering Committee approves new
   Members and the Chairperson countersigns. **[TBD: how to submit, typical
   turnaround.]** Membership is effective on countersignature.
4. **Join the Working Group.** Open a pull request that adds your organization,
   your name and your GitHub ID to the list in [`MEMBERS.md`](../MEMBERS.md).
   To work on the CIS specification too, do the same in the
   [CIS repository](https://github.com/configurator-file-type/cis-specification/blob/main/MEMBERS.md). This is a good first pull request: it teaches
   the workflow and it is the record that you have Joined.

## Step 4: Make a first contribution

Pick something small. Good first contributions: a confusing sentence you can
make clearer, a broken link, a missing glossary term, an example that does not
match the text. Issues labeled `good first issue` are chosen for this.

In the browser:

1. Open the file and click the pencil icon. GitHub creates a fork for you.
2. Make the edit.
3. Click **Commit changes**, then **Propose changes**, then **Create pull
   request**.
4. Fill in the template. For a wording fix, the class is **Editorial**.
5. Wait for review. If a reviewer leaves a suggestion, click **Commit
   suggestion** to accept it.
6. A Maintainer or Editor merges it. You do not merge your own.

## Step 5: Propose a real change

1. **Open an issue first.** Use `proposal` if the idea needs discussion, or
   `spec-change` if it is specific. Describe the problem in plain language, with
   a real product or connection as the example if you can.
2. **Let it be discussed.** Slack is fine for quick back-and-forth, but
   summarize anything that matters back onto the issue. The issue is the record.
3. **Draft the pull request** once the direction is agreed. Prose first, JSON
   second. Update the living specification file, the schema, an example file and
   the "Unreleased" section of the changelog together. Open it as a draft pull request until it is ready.
4. **Review.** A normative change needs two approvals, including an Editor, from
   two different organizations, and stays open at least 7 days so that people
   who meet weekly have a chance to see it.
5. **Merge.** The change is now on `main`, which is the working draft. It is
   published when the Working Group Approves the next version and a Maintainer
   copies the working draft into a new version folder, tags it and creates a
   GitHub Release.

## Things that will trip you up

- **Do not put specification text in Slack or email.** Put it in a pull request,
  from your own account. That is how it comes under the license.
- **Do not paste in other people's text,** including text from another standard,
  a product manual, or a colleague who is not named as a co-author. Name every
  copyright owner of what you submit.
- **Edit only the living spec file.** Changes go in `spec/cto/specification.md`.
  The version folders (`v0.2/`, `v0.3.0/` and
  so on) are frozen copies of published versions; leave them alone. A Maintainer
  creates a new one each time a version is released.
- **The file format is in scope; the products are not.** We specify how a
  connection standard is written down, not what the connection is. We specify
  how a product is described, not how it is built.
- **Nothing here is confidential.** Do not share anything in an issue, a pull
  request, Slack or a meeting that your employer would not want public.
- **Competitors are in the room.** Do not discuss actual prices, costs, bids,
  customers or unannounced products. Talking about the price *field* is fine.
  Use invented numbers in examples.

## Who to ask

| Question | Ask |
| --- | --- |
| How do I...? | **[TBD: Slack channel]** |
| Meetings, agendas, where to start | The Working Group Lead, listed in [`MAINTAINERS.md`](../MAINTAINERS.md) |
| Is this in scope? | A Maintainer, listed in [`MAINTAINERS.md`](../MAINTAINERS.md) |
| Paperwork and membership | The Chairperson, listed in [`MAINTAINERS.md`](../MAINTAINERS.md) |
| A conduct concern | The contacts in [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) |
