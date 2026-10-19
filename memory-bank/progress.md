# Progress Log

Append-only running log of completed tasks and significant decisions.

## 2026-05-05 -- Portfolio refresh kickoff
- Confirmed approved direction with the user:
  - Tone: professional and editorial.
  - Scope: full presentation refresh (visuals, layout, copy, project cards,
    blog landing) without changing the static stack or the blog API behavior.
  - Primary goal: portfolio first, blog as supporting proof.
  - Approach: editorial refresh (recommended option B).
- Initialized the Memory Bank with `projectbrief.md`, `productContext.md`,
  `activeContext.md`, `systemPatterns.md`, `techContext.md`, and this
  `progress.md`.
- Captured the contract of inline JS hooks in `blog.html` so the refresh can
  restyle without breaking admin/comments/month-filter behavior.

## 2026-05-05 -- Design system consolidation
- Rewrote `styles.css` around a single token system: color/typography/space/
  radius/shadow/motion variables defined under `:root` with light overrides
  under `[data-theme="light"]`.
- Removed duplicated and overlapping rules for project tiles, blog posts,
  archive controls, buttons, and admin controls. Kept all selectors that the
  inline JS depends on.
- Added utility-style primitives (container, section, eyebrow, button) shared
  across the homepage and the blog page.

## 2026-05-05 -- Homepage repositioning
- Restructured `index.html` around an editorial hero, proof strip, featured
  projects, capability-cluster skills, recent writing teaser, and contact
  footer.
- Replaced the percent-bar skills with grouped capability/tooling clusters.
- Kept the existing nav anchors and theme toggle behavior.

## 2026-05-05 -- Blog presentation refresh
- Restyled `blog.html` public reading surface with a calmer header, a single
  archive control row, and post cards that prioritize legibility.
- Visually separated admin login/panel and comment management from the
  public reader experience without changing any IDs or class hooks the
  inline JS depends on.

## 2026-05-05 -- Verification pass
- Cross-checked responsive breakpoints, semantic landmarks, focus visibility,
  and `prefers-reduced-motion` behavior.
- Confirmed the inline JS contracts in `index.html` and `blog.html` still
  work against the new markup and styling.

## 2026-05-05 -- Section intro / content overlap (sticky header scope)
- Root cause: `header { position: sticky; z-index: 1000; }` applied to every
  `<header>`, including in-page `section-header` / `projects-header` blocks,
  so section intros stacked above the following content.
- Fix: scope sticky + z-index to primary nav only via `body > header` in
  `styles.css`.

## 2026-08-29 -- Security: strip exposed credentials from HEAD
- Rewrote `DEPLOYMENT-INSTRUCTIONS.md` to use placeholders only; operators set real values in Coolify or untracked `.env`.
- Switched `backend/docker-compose.yml` to `env_file: .env` with `${VAR}` substitution; added `backend/.env.example` with placeholders.
- Extended `.gitignore` for `.env`, `*.pem`, keys, and `secrets/`.
- Removed production credential fallbacks from `backend/src/config/database.js`; updated `backend/README.md` default example user.

## 2026-06-06 -- Projects archive page
- Created `projects.html` with three sections: Live & Hosted (8), In Development
  (7), and Demos & Experiments (6).
- Content sourced from `LIVE-HOSTED-PROJECTS.md` and `LOCAL-DEV-Projects.md`.
- In-development cards link to GitHub profile (`ItsHeyBlinken`) for source code.
- Added category filter bar (All / Live / In Development / Demos) with JS.
- Added CSS for projects page layout, placeholder media, dev/prelaunch status
  badges, and GitHub link styling.
- Reduced homepage `#projects` to 3 featured cards (Online Card Show, Planner
  CRM, Dress Sizing App) with "View all projects" CTA.
- Updated nav links in `index.html` and `blog.html` to point to `projects.html`.

## 2026-08-29 -- Homepage redesign (approved mock)
- Restructured `index.html` to match approved visual mock:
  - Nav: Projects, Blog, Contact (+ theme toggle); removed Capabilities,
    Writing, GitHub, LinkedIn, BytesByBlinken Media from primary nav.
  - Hero: new copy, CTAs to #work and #contact.
  - Selected work (#work): flagship Online Card Show card + SmoothGig CRM and
    Chat App supporting cards; link to projects.html.
  - Contact (#contact): email, GitHub, LinkedIn.
  - Minimal footer: © 2026 BytesByBlinken.
- Removed from homepage DOM: proof strip, capabilities section, blog teaser.
- Added CSS for flagship horizontal card, two-up supporting grid, contact
  section, and minimal footer in `styles.css`.
- Aligned primary nav on `projects.html` and `blog.html` (Contact →
  index.html#contact).

## 2026-08-29 -- Homepage contact/footer spacing + flagship card hierarchy
- Increased vertical rhythm below `#work` and inside `#contact` so the
  archive link, contact block, and minimal footer no longer feel bunched.
- Fixed flagship layout: base `.project-card { display: flex }` was
  overriding `.project-card--flagship { display: grid }` due to source
  order. Moved homepage work rules under `#work` after base card styles.
- Flagship Online Card Show spans full width (horizontal media + copy);
  SmoothGig CRM and Chat App remain in a two-up supporting row.

## 2026-10-19 -- Documented blog admin sign-in in Memory Bank
- Added an "Admin access (create / edit posts)" subsection to
  `memory-bank/techContext.md` covering `?admin=1` / `#admin`, credentials
  source, and the post-login nav actions.

## 2026-10-19 -- Blog API 500s were a database host mismatch
- Blog page showed HTTP 500 on `GET /api/posts` and `GET /api/comments/:id`, then fell back to static posts.
- API root stayed 200. `/health` reported `database: disconnected` with `ECONNREFUSED` to the configured Postgres host on port 5432.
- No application code change. Chris updated the database host / `DATABASE_URL` in the deployed environment.
- Rechecked live: `/health` connected, `/api/posts` returned 10 posts (HTTP 200), `/api/comments/1` and `/2` returned HTTP 200.

## 2026-08-30 -- Inner pages chrome + archive cleanup
- Aligned `projects.html` and `blog.html` footers with homepage minimal footer.
- Projects archive: removed filter pills and Demos section; hid placeholder
  in-dev cards (QuizMaster, Boilerplate Library, Personal Finance Tracker).
- Blog: hid public admin login (available via `?admin=1`); human-readable
  dates; basic `**bold**` markdown rendering in post bodies.

## 2026-10-19 -- Blog Open Graph / Twitter Card meta tags
- Added OG and Twitter Card tags to `blog.html` head (title/description from
  existing page copy; `og:url` = https://bytesbyblinken.com/blog.html).
- No existing ~1200x630 share image in repo; created
  `images/assets/og-blog.png` (1200x630, ~40 KB) using site dark palette,
  accent, and Logo.png. No layout/script/content changes beyond head meta.
- `index.html` already has basic OG/Twitter tags (left unchanged).
- Per-post link previews would need static per-post URLs (posts are JS-rendered).
