import { notifications } from '../data/notifications.js';
import { logInfo, logWarn, logError } from '../../logging-middleware/src/index.js';

function applyQueryFilters(query) {
  const { limit, page, notification_type } = query;
  let result = notifications;

  if (notification_type) {
    result = result.filter((item) => item.Type === notification_type);
    logInfo('backend', 'info', 'controller', 'Filtering notifications by type', {
      notification_type,
      matched: result.length,
    });
  }

  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 10, 1);
  const start = (pageNumber - 1) * pageSize;

  logInfo('backend', 'info', 'controller', 'Applying pagination', {
    pageNumber,
    pageSize,
  });

  return {
    total: result.length,
    page: pageNumber,
    limit: pageSize,
    notifications: result.slice(start, start + pageSize),
  };
}

export function getNotifications(req, res, next) {
  try {
    const data = applyQueryFilters(req.query);
    logInfo('backend', 'info', 'controller', 'Notifications fetched', {
      count: data.notifications.length,
    });
    res.json(data);
  } catch (err) {
    logError('backend', 'error', 'controller', 'Failed to fetch notifications', {
      error: err.message,
    });
    next(err);
  }
}

export function getNotificationById(req, res, next) {
  try {
    const notification = notifications.find((item) => String(item.ID) === req.params.id);

    if (!notification) {
      logWarn('backend', 'warn', 'controller', 'Notification not found', {
        id: req.params.id,
      });
      return res.status(404).json({ error: 'Notification not found' });
    }

    logInfo('backend', 'info', 'controller', 'Notification retrieved by id', {
      id: req.params.id,
    });
    res.json(notification);
  } catch (err) {
    logError('backend', 'error', 'controller', 'Failed to fetch notification by id', {
      error: err.message,
    });
    next(err);
  }
}
