# Tech Context

## Frontend
- Plain HTML5, CSS3, vanilla JavaScript (no framework, no bundler).
- Fonts: Inter and Poppins from Google Fonts.
- Theme system: `data-theme` attribute on `<html>` with `dark` (default) and
  `light` variants, persisted in `localStorage` (`portfolio-theme`).
- Smooth scroll handled in JS via `scrollIntoView({ behavior: 'smooth' })`.
- Skill bars animate via `IntersectionObserver` and inline width updates.

## Blog
- Public list page: `blog.html`
- Talks to API base: `https://api.bytesbyblinken.com/api`
- Endpoints used by the page:
  - `POST /auth/login`, `GET /auth/verify`
  - `GET /posts`, `POST /posts`, `PUT /posts/:id`, `DELETE /posts/:id`
  - `GET /comments`, `GET /comments/:postId`, `POST /comments`,
    `PUT /comments/:id/approve`, `DELETE /comments/:id`
- Admin auth uses a JWT in `localStorage` under `blog-admin-token`.
- If the API is unreachable, `displayStaticPosts()` renders an embedded
  fallback archive so the blog still works.

### Admin access (create / edit posts)
- The login form is hidden on the public blog page.
- Open either:
  - `https://bytesbyblinken.com/blog.html?admin=1`
  - `https://bytesbyblinken.com/blog.html#admin`
- Sign in with the blog admin username/password (backend auth; deploy docs use
  `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH`).
- After login, use **+ New Post**, **Edit Mode**, or **Manage Comments** in
  the nav admin panel.

## Backend (out of scope for refresh)
- Node 18+, Express 4, `pg`, `jsonwebtoken`, `bcryptjs`, `helmet`,
  `express-rate-limit`, `cors`.
- Deployed via Coolify -> Docker; database is PostgreSQL.

## Asset locations
- `images/` -- profile, logos, hero textures.
- `screenshots/` -- project screenshots referenced by homepage tiles.
- `projects/` -- embedded project demos. Not part of the refresh.

## Tooling
- Local development: open the static files directly or serve them with any
  static server. Backend has its own `npm run dev` workflow under `backend/`.
- No automated test suite for the frontend.
