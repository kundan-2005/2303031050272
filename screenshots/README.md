# Screenshots for Submission

Place captured screenshots in this folder before final submission. The following files are required or recommended for evaluation.

## Required screenshots

1. `1_registration_response.png`
   - Show the POST request to `http://4.224.186.213/evaluation-service/register` and the server response containing `clientID`.
   - Mask `clientSecret` before saving or uploading.

2. `2_backend_notifications.png`
   - Show a GET request to `http://localhost:4000/notifications?limit=10&page=1` and the JSON response.
   - Ensure `total`, `page`, and `limit` values are visible.

3. `3_frontend_ui_desktop.png`
   - Show the Notifications page in the browser with filters and sample notifications.

## Recommended screenshots

4. `4_frontend_ui_mobile.png`
   - Show the mobile layout or responsive viewport.

5. `5_logging_console.png`
   - Show backend console output for logging middleware activity.

6. `6_notify_all_demo.png`
   - Show the output of `notification-app-be/scripts/notify_all_demo.js`.

7. `7_priority_notifications.png`
   - Show priority notification results or the priority inbox view.

## Capture tips

- Use Postman, Insomnia, or a terminal to capture command and response output.
- Make text readable and crop out unrelated UI elements.
- Save screenshots as PNG with suitable resolution.

## Add screenshots to the repo

1. Save images in the `screenshots/` folder using the filenames above.
2. From the repository root:

```powershell
git add screenshots/*
git commit -m "Add submission screenshots"
git push origin main
```

## Validation checklist

- `screenshots/` contains `1_registration_response.png`, `2_backend_notifications.png`, and `3_frontend_ui_desktop.png`.
- `notification-system-design.md` contains the stage deliverables.
- `.env` is not committed. Use `.env.example` for local configuration.

## Included assets

- `1_registration_response.svg`, `2_backend_notifications.svg`, `3_frontend_ui_desktop.svg` — placeholder visuals.
- `postman/notification_collection.postman_collection.json` — Postman collection for registration and notifications requests.
- `4_frontend_ui_mobile.svg`, `5_logging_console.svg`, `6_notify_all_demo.svg` — additional placeholder visuals.
