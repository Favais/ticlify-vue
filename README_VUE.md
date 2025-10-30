# Ticlify — Vue Implementation

This repository contains the Vue 3 + TypeScript implementation of the Ticlify ticket management app.

Important: The original task required three separate implementations (React, Vue, and Twig). This folder currently contains the Vue implementation only. The Vue app provides a complete ticket CRUD experience, authentication (simulated via json-server/localStorage), and a responsive UI matching the shared design language.

Quick start

1. Install dependencies

```bash
npm install
```

2. Start the mock JSON API (uses db.json)

```bash
npx json-server --watch db.json --port 5000 --cors
```

3. Start the dev server

```bash
npm run dev
```

Example test user (from `db.json`)
- email: sosa@gmail.com
- password: 123456

Notes on the Vue app
- Framework: Vue 3 + TypeScript + Vite
- State: Pinia stores located in `src/stores` (userStore, tickets)
- HTTP: axios to `http://localhost:5000`
- UI: TailwindCSS utilities + small component set in `src/components/ui`

Key routes
- `/` — Landing page (Hero + feature cards)
- `/auth/login` — Login page (saves session to localStorage key `ticketapp_session`)
- `/auth/signup` — Signup (creates a user via json-server and sets session)
- `/dashboard` — Protected dashboard (requires `ticketapp_session`)
- `/tickets` — Protected tickets management (CRUD)

Authorization & session
- Sessions are simulated: after a successful login/signup the user JSON is stored in `localStorage` under the key `ticketapp_session`. The router uses a global `beforeEach` guard to protect routes with `meta.requiresAuth`.

Validation & rules
- Title and status are required for tickets. Status accepts only `open`, `in_progress`, or `closed`.
- Description is optional, but if provided must be at least 10 characters.

Missing items
- React implementation: not present
- Twig implementation: not present
- Accessibility audit: basic semantic HTML and alt text present; a focused/a11y pass is recommended.

If you'd like, I can:
- Finish small Vue fixes and run the dev server locally to verify end-to-end flows.
- Scaffold the React and Twig versions (I can create separate folders with starter apps that mirror the Vue layout and use the same `db.json` backend).
