# Syskode Technologies — Construction Project Portal

A professional bilingual React prototype, built with JavaScript, JSX, Vite and a Node.js / Express demo API.

## Start locally

Requires Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run build
npm start
```

Open http://localhost:3001. Express serves the React build and same-origin API. For development, run `npm run dev`. Vite mounts the same Express API as middleware, so both the frontend and API run in one development process.

```bash
npm run test:api
```

## Review the roles

Use the avatar menu at the top right to switch between Client, Project Manager and Administrator. Use the corporate website link in the sidebar to review the bilingual corporate page, or exit the demo workspace to open the role selection screen.

- Client: assigned Al Noor Residence only, read-only timeline, documents, camera previews, payments and updates.
- Project Manager: Al Noor Residence and Seef Business Centre, document metadata uploads, progress editing, updates.
- Administrator: all projects, project creation and user/permission demo records.

All names, amounts and project records are fictional. Photography is illustrative, sourced from Unsplash, and does not depict the client's real projects. No real camera credentials, customer information or confidential files are included.

## Hosted preview and Express source

The private hosted Site serves the compiled React frontend with browser-local sample data. Changes persist only on the current browser. Node/Express is included in this repository and runs with `npm start`; the static Site host does not run a persistent Express process. The frontend detects the local Express API and sends mutation requests to it. When Express is available, the frontend loads project, document, update, stage and user records from the API. Use a fresh browser profile or clear the `miras-*` localStorage entries to reset the frontend.

The Express API keeps its own demonstration data in memory and resets on restart. It uses server-side sessions, HTTP-only SameSite cookies, role checks, project isolation, input validation, Helmet headers, a request limit and cross-origin mutation rejection. It intentionally allows passwordless selection of built-in demo users. These measures demonstrate authorization, and do not make the prototype a production authentication system. Built-in demo identity access is fixed on the Express API; additional user records do not become sign-in identities.

Documents: uploads save metadata only; original files are not retained. Preview/download creates a clearly labelled HTML sample record. Reports are HTML downloads. The prototype does not generate genuine construction PDFs or process payments. Camera panels show images with a no-live-connection label; they do not stream or record. Support requests and user creation do not send email. English and Arabic include RTL layouts and browser-saved language preferences. Demo dates are anchored to 28 October 2026.

## Production implementation boundary

Before real customer use, replace demo role selection with verified identity and secure password/SSO/MFA flows; use a database and persistent session store; extend the API to serve payment records and all remaining project settings; add private object storage with validated uploads, malware checks and expiring authorized download URLs; add audit history, backup/restore and monitoring; localize user-created records; configure email delivery and project-specific milestone scheduling; and integrate cameras through an authenticated HTTPS streaming gateway after an IP camera/NVR compatibility assessment. Production infrastructure, integrations, credentials, pricing and deployment terms are outside this prototype.

Set a strong persistent `SESSION_SECRET` and `COOKIE_SECURE=true` when operating behind properly configured HTTPS. Express's default memory session store is for local prototype use only. Never expose `/api/demo-session` for actual client data.

## Main source files

- `src/main.jsx`: role-based React interface and prototype workflows.
- `src/styles.css`: responsive visual system and RTL layouts.
- `src/data.js`: fictional seed data.
- `server/app.js`: Express demo API and access controls.
- `server/api.test.js`: authorization and isolation checks.

Prepared as a confidential prototype for review. Source ownership, commercial terms and handover arrangements should be agreed separately in the development contract.

## Brand assets

Official Syskode Technologies logo sourced from https://syskode.com/wp-content/uploads/2025/06/ezgif-5029c4bba20c83.gif. The static PNG uses the final frame of that official animation. Brand colours: navy #00002F and cyan #0DABDE. UI type is enlarged for readability.
