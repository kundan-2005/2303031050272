## Campus Notification Evaluation — Submission Repo

This repository contains the final submission for the campus notification evaluation.

Included in this repo:

- `notification-app-be/` — Express backend with notification routes and logging middleware.
- `notification-app-fe/` — React frontend built with Vite.
- `logging-middleware/` — reusable logging package that forwards request logs to the evaluation log API.
- `notification-system-design.md` — design notes and stage deliverables.

## Quick start

### Backend

```powershell
cd notification-app-be
npm install
npm start
```

The backend runs on `http://localhost:4000` by default.

### Frontend

```powershell
cd notification-app-fe
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:4000` by default.

## Configuration

Use `.env.example` as a template for local environment variables. Do not commit `.env` or any secret values.

Example values:

```text
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
VITE_API_BASE=http://localhost:4000
```

## Helper scripts

- `scripts/run_services.ps1` — instructions for running backend and frontend.
- `scripts/run_postman_newman.ps1` — run the Postman collection with `newman` and save results.
- `scripts/commit_screenshots.ps1` — commit screenshot files quickly.
- `scripts/convert_svgs_to_pngs.js` — convert SVG placeholders in `screenshots/` to PNG files.

To generate PNG placeholders locally:

```powershell
npm install sharp
node scripts/convert_svgs_to_pngs.js
```

## Project summary

This project implements a notification platform with a Node.js/Express backend, a React/Vite frontend, and reusable logging middleware. It includes notification filtering, pagination, structured logs, and documentation for submission.
