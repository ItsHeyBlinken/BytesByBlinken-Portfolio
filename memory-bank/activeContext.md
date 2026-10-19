# Active Context

## Current focus
Homepage redesign shipped — new IA: hero, selected work (#work), contact (#contact),
minimal footer. Nav simplified to Projects / Blog / Contact across primary pages.

## Approved direction
- Tone: professional and editorial.
- Refresh scope: full presentation refresh (visual, layout, copy, project
  cards, blog landing) while keeping the static HTML/CSS/JS stack and the
  existing blog API/admin/comment behavior untouched.
- Primary goal: mixed -- portfolio first, with the blog as strong supporting
  proof.
- Approach: editorial refresh -- consolidate the design system, restructure
  the homepage story, reframe project cards around outcome/role/tech, and
  give the blog a cleaner reader-first layout.

## Visual thesis
Light-first editorial portfolio with generous spacing, strong typography,
restrained accents, and subtle developer cues. Dark mode remains a peer, not
an afterthought.

## Section sequence (homepage)
1. Sticky nav — wordmark, Projects / Blog / Contact, theme toggle.
2. Hero — identity, role, CTAs to #work and #contact.
3. Selected work (#work) — flagship Online Card Show + two supporting cards.
4. Contact (#contact) — email, GitHub, LinkedIn.
5. Minimal footer — copyright only.

## Active constraints
- Do not commit or push to GitHub (user handles commits unless cloud agent).
- Do not run database migrations or deployment-changing actions.
- Backend (`backend/`) is untouched.
- Embedded project demos under `projects/` are not redesigned in this pass.

## Open follow-ups (after this refresh lands)
- Consider extracting inline `<script>` blocks into separate JS files for
  maintainability.
- Blog page OG/Twitter share image shipped (`images/assets/og-blog.png`);
  consider a favicon refresh and richer homepage OG tags (site_name / alts).
- Consider an "About" section/page if Chris wants more space for narrative.
- Add screenshots for live hosted projects (currently using placeholder initials).
- Optionally link live projects to their GitHub repos in addition to live URLs.
