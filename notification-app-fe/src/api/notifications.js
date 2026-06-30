const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchNotifications({ limit = 10, page = 1, notification_type } = {}) {
  const params = new URLSearchParams();
  params.set('limit', limit);
  params.set('page', page);

  if (notification_type && notification_type !== 'All') {
    params.set('notification_type', notification_type);
  }

  const response = await fetch(`${API_BASE}/notifications?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch notifications: ${response.status}`);
  }

  return response.json();
}
