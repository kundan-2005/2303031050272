## Campus Notification Evaluation — Submission Repo

This repository contains the completed submission for the campus notification evaluation.

What is included

- `notification-app-be/` — Express backend with logging middleware integration
- `notification-app-fe/` — React frontend (Vite) that consumes the backend
- `logging-middleware/` — small reusable logging package which sends logs to the evaluation log API
- `notification-system-design.md` — design notes

Quick start (local)

1. Backend

```powershell
cd notification-app-be
npm install
npm start
```

Backend runs on `http://localhost:4000` by default.

2. Frontend

```powershell
cd notification-app-fe
npm install
npm run dev
```

Frontend expects the backend at `http://localhost:4000` by default. To override, set `VITE_API_BASE` in your environment.

Security / secrets

- Do NOT commit real secrets into the repository. Use the provided `.env.example` as a template and store secret values in a local `.env` file (or use your OS-secure env storage).
- Keep your `clientID` and `clientSecret` private — do not upload them to GitHub.

Submission notes

See `SUBMISSION.md` for a concise checklist, what to include for evaluation, and how to capture screenshots and outputs.
# 2303031050272
This project implements a campus notification platform with a Node.js/Express backend, a React frontend, and a reusable logging middleware layer. It includes notification filtering, pagination, structured logging, and a registration-ready submission prepared for the Affordmed evaluation.
