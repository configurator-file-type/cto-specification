# Verification scope

Node 24 and Chromium/Three.js 0.185.1 were used for this reference example.

- Eight local unit scenarios pass: exact reference and three-axis bindings,
  off-step/out-of-bounds refusal, fixed-snapshot reimport without version change,
  source-defined void preservation/containment, fixed 0.2 handling and unsafe
  expression/protected binding rejection.
- Eight actual browser scenarios pass: current mesh and outline dimensions equal
  the source (no inflated geometry); a slider changes real 3D width; typed Y/Z
  update the mesh; camera and origin remain fixed during changes; bad steps leave
  the last accepted box; the real downloaded CTO reopens as a fixed snapshot;
  the source-defined optional void remains fixed and rejects an undersized host;
  390px reflow, keyboard slider operation and no-WebGL textual/export fallback.
- Desktop, resized-box and mobile screenshots were visually inspected. The
  screenshot in this folder is actual rendered output, not a mockup.
- The core correction was also checked against all eleven unchanged upstream
  parameter vectors and additional fixed-file/opening tests, 33 cases in total.
  This is not full schema validation or independent implementation conformance.
- No native CAD, private model, framing/material detail, production Registry or
  house-builder data is used. Nothing is represented as engineering approval.

This proposed example does not assert an official hosted viewer exists, change
GitHub Pages settings, publish a new specification version, or bypass working-
group review before inclusion on the main branch.
