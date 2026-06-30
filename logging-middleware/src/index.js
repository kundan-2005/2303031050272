import fetch from 'node-fetch';

const LOG_API_URL = 'http://4.224.186.213/evaluation-service/logs';

export function logEvent(stack, level, packageName, message, metadata = {}) {
  const body = {
    stack,
    level,
    package: packageName,
    message,
    metadata,
  };

  console.log(JSON.stringify({ type: 'log', ...body }));

  fetch(LOG_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch((err) => {
    console.error(JSON.stringify({ type: 'log-error', error: err.message, body }));
  });
}

export function logInfo(stack, level, packageName, message, metadata = {}) {
  logEvent(stack, level, packageName, message, metadata);
}

export function logWarn(stack, level, packageName, message, metadata = {}) {
  logEvent(stack, level, packageName, message, metadata);
}

export function logError(stack, level, packageName, message, metadata = {}) {
  logEvent(stack, level, packageName, message, metadata);
}

export function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();
  logInfo('backend', 'info', 'route', 'Request started', {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    logInfo('backend', 'info', 'route', 'Request completed', {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: durationMs.toFixed(2),
    });
  });

  next();
}
