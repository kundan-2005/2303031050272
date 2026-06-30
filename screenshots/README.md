# Screenshots for Submission

Place your captured screenshots in this folder before final submission. Below are the required and recommended screenshots, exact file-name suggestions, and capture tips so the HR/evaluation team can verify your work quickly.

Required screenshots (recommended order and filenames):

1. `1_registration_response.png`
	- What to show: the POST request to `http://4.224.186.213/evaluation-service/register` and the full server response containing `clientID` (mask `clientSecret` before uploading).
	- How to capture: use Postman/Insomnia request + response view, or run the curl command in a terminal and screenshot the terminal output.

2. `2_backend_notifications.png`
	- What to show: a GET request to your backend `http://localhost:4000/notifications?limit=10&page=1` (or the evaluation endpoint) and the JSON response (status 200 and response body visible).
	- How to capture: use Postman/Insomnia or a terminal curl command. Ensure pagination fields (`total`, `page`, `limit`) are visible.

3. `3_frontend_ui_desktop.png`
	- What to show: Desktop view of the Notifications page in the browser showing filters, an unread count, and sample notifications.
	- How to capture: open the frontend URL from Vite (e.g., `http://localhost:5173`), make sure the UI shows notifications, and take a clear screenshot.

Recommended screenshots (optional but helpful):

4. `4_frontend_ui_mobile.png`
	- Mobile view/smaller viewport demonstrating responsive layout.

5. `5_logging_console.png`
	- What to show: the backend terminal or console showing logging middleware entries for requests (start/completed logs and any outgoing log POSTs).

6. `6_notify_all_demo.png`
	- What to show: the output of running `notification-app-be/scripts/notify_all_demo.js` showing batching progress.

7. `7_priority_notifications.png`
	- What to show: query result or frontend view for the top-N priority notifications (Priority Inbox).

Capture tips and best practices
- Use Postman or Insomnia for clear request+response screenshots. Open the request, show the request body and the response panel together.
- If using curl/PowerShell, copy the command and output into the terminal and screenshot the terminal window. Include the command in the screenshot if possible.
- Make text readable: zoom into the browser or terminal so text isn't tiny. Crop to remove unrelated UI chrome but keep the important bits.
- Mask secrets: if a response contains `clientSecret` or other sensitive tokens, blur or black them out before committing.
- Preferred image format: PNG. Keep file sizes reasonable (< 2–3 MB) and resolution large enough to read text (e.g., 1280px width).

How to add screenshots to the repo
1. Save images into this `screenshots/` folder using the suggested filenames.
2. From the repo root run:

```powershell
git add screenshots/*
git commit -m "Add submission screenshots"
git push origin main
```

Checklist to validate before submission
- `screenshots/` contains at least `1_registration_response.png`, `2_backend_notifications.png`, and `3_frontend_ui_desktop.png`.
- `notification-system-design.md` is filled with Stage 1–7 deliverables (present in repo).
- `.env` is NOT committed (we included `.env.example` for guidance).

If you'd like, I can generate a Postman collection (JSON) with the registration and notifications requests ready to import — then you just run them and capture responses. Would you like me to add that collection to the repo?

