# Submission Checklist

Follow these steps to prepare the final submission for the evaluation.

1. Verify code is committed and pushed to your GitHub repository.

2. Do NOT include secrets in the repository. Instead, use environment variables.

3. Capture screenshots required by the evaluation:
   - API request/response from the registration endpoint (POST to `/evaluation-service/register`).
   - API request/response from your backend `/notifications` endpoint.
   - Frontend UI showing notifications and filters.

4. Provide the following details in the submission form (use your official college info):
   - College email
   - Full name
   - GitHub username
   - Roll number / enrollment number
   - Access code

Environment variables

Create a local `.env` file (do not commit). Use `.env.example` as a template. Example variables:

```
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
VITE_API_BASE=http://localhost:4000
```

Security note

- Treat `CLIENT_SECRET` as sensitive. Never paste it into public issue trackers, GitHub gists, or commits.

How to run

Backend:
```
cd notification-app-be
npm install
npm start
```

Frontend:
```
cd notification-app-fe
npm install
npm run dev
```

HR Round Checklist

When preparing for HR / final submission ensure the following are included in your GitHub repository and submission form:

- A clear `README.md` with run instructions (root `README.md` is present).
- `SUBMISSION.md` with the checklist and environment guidance.
- `screenshots/` folder containing the required screenshots (registration, backend API, frontend UI).
- Do not commit sensitive values (`clientSecret`) to the repository. Use `.env` locally.
- In the submission form provide your official college email, full name, GitHub username, roll number, and the `clientID` returned by the registration API.

Optional (recommended):
- A short recorded video (30-60s) showing the frontend working and API responses.
- A small note in the README about which files to open for evidence (e.g., `notification-system-design.md`, `screenshots/`).

Questions

If you want, I can help prepare the final screenshots and generate a short submission README you can upload.
