import express from 'express';
import { requestLogger, logError, logInfo } from '../../logging-middleware/src/index.js';
import notificationsRouter from './routes/notifications.js';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/notifications', notificationsRouter);

app.use((err, req, res, next) => {
  logError('backend', 'error', 'server', 'Unhandled server error', {
    error: err.message,
    path: req.originalUrl,
    method: req.method,
  });
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logInfo('backend', 'info', 'server', 'Backend service started', { port });
});
