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

Questions

If you want, I can help prepare the final screenshots and generate a short submission README you can upload.
