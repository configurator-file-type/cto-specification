# Contributing

Thank you for helping build the `.cto` file format. This page is the rulebook
for this repository, which belongs to the CTO Specification Working Group. The
companion `.cis` format is developed in <https://github.com/configurator-file-type/cis-specification> under the
same rules. If you are new, start with the step-by-step guide in
[`docs/ONBOARDING.md`](docs/ONBOARDING.md) and come back here when you need a
detail.

This document adopts the
[Community Specification Contribution Policy 1.0](https://github.com/CommunitySpecification/1.0/blob/master/6._Contributing.md)
and adds the Project's own rules. Approval requirements are set in
[`Governance.md`](Governance.md) Section 6.

## Before your first contribution

Contributing here has legal effect. The Project is a series of Joint Development
Foundation Projects, LLC, and only Members that have Joined a Working Group may
participate in it. When you submit a pull request to a specification, your
organization makes the copyright and patent commitments in the
[Community Specification License 1.0](LICENSES/Community-Specification-License-1.0.md),
limited to the [Scope](Scope.md) of that Working Group.

1. **Check whether your organization is already a Member.** Look in
   [`MEMBERS.md`](MEMBERS.md). Membership covers a Member's Affiliates. If your
   organization is listed, skip to step 3.
2. **Become a Member.** Review the Membership Agreement Package
   (**[TBD: link]**) with whoever can sign for your organization. There is no
   fee. Choose a level: Steering, General or Contributor. Execute the Membership
   Agreement as described at **[TBD: Project website instructions]**. The
   documents are the same for every Member and are not negotiated. New Members
   join on Approval of the Steering Committee, and membership takes effect when
   the Chairperson countersigns. If you are contributing as an individual, you
   sign as the Member yourself.
3. **Join the Working Group.** Open a pull request adding your organization, and
   the people who will contribute for it with their GitHub IDs, to the list in
   [`MEMBERS.md`](MEMBERS.md). To work on the CIS specification as well,
   do the same in the [CIS repository](https://github.com/configurator-file-type/cis-specification/blob/main/MEMBERS.md). By doing so the Member
   agrees to that Working Group's Charter.
4. **Read [`Scope.md`](Scope.md).** It is short. Work outside it does not belong
   in this repository.
5. **If your employer holds patents in this area,** tell whoever handles
   intellectual property there before you contribute. The license gives a
   Contributor 45 days from a Contribution to exclude a patent claim, by a notice
   in [`Notices.md`](Notices.md).

**Not a Member and not ready to be one?** You can still give feedback, once the
Working Group Participants have Approved it and you have signed the short
Non-Member Agreement (Appendix C of the Membership Agreement Package). Ask a
Maintainer.

**Issues from the public.** Anyone can read this repository, and anyone with a
GitHub account can technically open an issue. Questions and error reports are
welcome from anyone. Proposed specification content, such as suggested text,
schema or designs, is accepted only from Working Group Participants and from
Non-Members with a signed agreement. If you are neither, describe the problem
you have and stop there. **[DECISION: confirm this line with JDF.]**

## Issues

Issues track everything. Each has one type label:

| Label | Use it for |
| --- | --- |
| `discussion` | A question, or a use case you want on the record. May become a spec change |
| `proposal` | A new idea that needs discussion before anyone drafts text. Title begins "Proposal:" |
| `spec-change` | A specific change to a specification, tracked until it is merged |

If you are going to work on a `spec-change` issue, assign it to yourself or say
so in a comment. If the issue affects the other format too, link the matching
issue in <https://github.com/configurator-file-type/cis-specification>.

## Pull requests

**Decide the class of your change** (Governance.md 6.4):

- **Editorial:** a conformant file, and conformant software, behave exactly as
  before. No issue needed.
- **Normative:** anything else that touches a specification or schema. Needs a
  linked `spec-change` issue, and stays open at least 7 days.
- **Governance:** changes a governance file. Needs an issue and Steering
  Committee Approval.

If you are not sure, call it normative.

**Then:**

1. Fork the repository, or create a branch if you have write access. Name the
   branch for the issue: `123-port-tolerance-units`.
2. Make one logical change per pull request. Small pull requests get reviewed;
   large ones wait.
3. For a normative change, update everything together: specification text,
   schema, at least one example file, and the "Unreleased" section of
   `spec/CHANGELOG.md`. Write the prose
   first and the JSON second. Use the RFC 2119 keywords (MUST, SHOULD, MAY) only
   where you mean a conformance requirement.
4. Edit the living specification file, `spec/cto/specification.md`. Do not edit
   anything in a version folder (`spec/cto/v0.3.0/` and so on). Those are frozen copies of
   published versions. A Maintainer creates them when a version is released
   (Governance.md 6.10), so you never copy the file yourself.
5. If your change needs a matching change to the other specification, open a
   linked pull request in <https://github.com/configurator-file-type/cis-specification> as well. The two are reviewed
   by their own Working Groups and merged together.
6. Open the pull request as a **draft** until it is ready for review, and fill
   in the template. Name every co-author.
7. Contribute only work your organization owns or has the right to submit, and
   name every known copyright owner in the pull request (Project Charter
   Section 10). Do not paste in text written by someone who is not listed in
   `MEMBERS.md`, and do not paste in text from another standard or a product
   document.

## Review

- Reviews use GitHub's review tool. **Approve** means you would merge it.
  **Comment** is a question and does not count as approval. **Request changes**
  blocks the merge until you withdraw it or a Maintainer rules on it.
- For wording fixes, use GitHub's suggestion feature so the author can accept
  them in one click.
- Review the change in front of you. Open a new issue for anything else you
  notice.
- Reviewers aim to respond within 3 working days **[DECISION]**. Authors aim to
  respond to review comments within the same time. A pull request with no
  activity for 30 days **[DECISION]** may be closed; it can be reopened.
- No one approves or merges their own pull request.
- Pull requests are squash-merged, with a message that links the issue.
  **[DECISION]**

## Slack

Slack is for quick questions and coordination: **[TBD: workspace, how to join,
channel names and what each is for]**.

Slack is not the record. If a conversation there changes what should happen to
a specification, whoever is carrying it forward writes a summary on the issue or
pull request, the same day, with a link to the thread. Do not propose
specification text in Slack; open a pull request.

Nothing you disclose in any Project channel or meeting is confidential, whatever
it is marked (Project Charter Section 14). Separately, do not publish outside
the Project anything from Slack or a meeting that the Project has not itself
made public. Summaries posted to this repository under Governance.md 6.8 are
the approved route.

The JDF Antitrust Policy applies everywhere. See [`Notices.md`](Notices.md).

## Source code

Code is licensed under Apache-2.0 and is subject to the
[Developer Certificate of Origin 1.1](https://developercertificate.org/), as the
Working Group Charter requires. Sign off every commit to code:
`git commit -s`. See [`LICENSE.md`](LICENSE.md).

## Conduct

The JDF Code of Conduct applies. See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)
for the link and who to contact.

## Appeals

If you disagree with a decision, say so on the issue or pull request, or open a
new issue. A Maintainer will respond in writing (Governance.md 2.2). A procedural
error, including lack of due process, may be appealed in writing to the
Chairperson within 30 days (Project Charter 6.5).
