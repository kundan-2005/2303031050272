import express from 'express';
import { getNotifications, getNotificationById } from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/', getNotifications);
router.get('/:id', getNotificationById);

export default router;
