# Notification System Design

This document contains the Stage 1–7 deliverables requested in the evaluation. It includes API contracts, data schema, sample queries, scaling notes, a pseudocode implementation for `notify_all`, and guidance for the priority inbox.

---

## Stage 1 — API design (REST)

Base URL (example): `http://localhost:4000`

Endpoints

- GET /notifications
	- Query parameters: `limit` (number), `page` (number), `notification_type` (Event|Result|Placement)
	- Response (200):

```json
{
	"total": 123,
	"page": 1,
	"limit": 10,
	"notifications": [
		{ "ID": 1, "Type": "Result", "Message": "Mid-sem results published", "Timestamp": "2026-04-22T17:51:30Z" }
	]
}
```

- GET /notifications/:id
	- Response (200): single notification object
	- 404 if not found

Request / Response headers: use JSON (`Content-Type: application/json`). Authentication is out of scope for the sample app (the evaluation server uses a separate registration flow).

Naming conventions: Use predictable, camelCase or PascalCase fields for payloads. `ID`, `Type`, `Message`, `Timestamp` used here match the pre-provided sample.

---

## Stage 2 — Persistent storage choice and schema

Recommendation: Use a relational database (Postgres) for durability and predictable queries.

Rationale:
- Notifications are well modeled as rows with structured fields.
- SQL supports powerful queries (date ranges, indexes) and ACID guarantees.

Sample schema (Postgres)

```sql
CREATE TABLE notifications (
	id SERIAL PRIMARY KEY,
	type VARCHAR(32) NOT NULL,
	message TEXT NOT NULL,
	recipient_id INTEGER NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	is_read BOOLEAN DEFAULT false
);

CREATE INDEX idx_notifications_type_created_at ON notifications(type, created_at DESC);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_id);
```

Potential problems and solutions as data volume increases:
- Large volumes: shard by recipient_id or time ranges, use read replicas for heavy reads.
- Hot indexes: keep only necessary indexes, and add partial indexes for `is_read = false` if unread queries are frequent.

Example SQL query to return notifications for a student (with pagination):

```sql
SELECT id, type, message, created_at, is_read
FROM notifications
WHERE recipient_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;
```

Example NoSQL alternative (if expecting extremely high write volume): use DynamoDB with a composite key (recipient#createdAt) and a GSI for unread items.

---

## Stage 3 — Slow query analysis and optimization

Problem example from images:

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

Why this may be slow:
- Full table scan if there is no index on `(studentID, isRead, createdAt)`.
- Ordering without an index requires sorting large result sets.

Improvement: add a composite index that supports the WHERE and ORDER BY:

```sql
CREATE INDEX idx_student_unread_createdat ON notifications(studentID, isRead, createdAt DESC);
```

Rewritten query (same semantics) will then use the index and avoid large sorts.

Also consider changing `ORDER BY createdAt ASC` to `DESC` for recent-first UX and efficient index scans if index is created `createdAt DESC`.

Find students who got a placement notification in last 7 days (example):

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE type = 'Placement' AND createdAt >= now() - interval '7 days';
```

---

## Stage 4 — Performance improvements and trade-offs

Strategies:

- Pagination: always use `LIMIT` + `OFFSET` (or keyset pagination for large offsets).
- Caching: place a short-lived cache (Redis) in front of frequent queries; cache top-N notifications per user.
- Read replicas: scale reads horizontally for high read loads.
- Precompute top notifications (materialized view): for priority inbox, maintain a denormalized table updated by background workers.
- Asynchronous writes: accept writes quickly and process expensive work in background (e.g., send email notifications via queue).

Trade-offs:
- Caching reduces DB load but introduces eventual consistency.
- Read replicas increase read capacity but complicate strong consistency for recent writes.

---

## Stage 5 — notify_all pseudocode and reliability

Goal: Notify many students (e.g., 50k) reliably and efficiently.

Key ideas:
- Batch work into small groups (e.g., 500 per batch).
- Use a message queue (RabbitMQ, SQS) to distribute work to workers.
- Make notification sending idempotent (record delivery attempts).

Sample Node.js pseudocode (batched with async worker):

```javascript
// notify_all.js (pseudo)
import fetch from 'node-fetch';

async function sendNotificationToStudent(studentId, message) {
	// save to DB
	// push to app (push gateway) or call email API
}

export async function notify_all(studentIds, message) {
	const BATCH = 500;
	for (let i = 0; i < studentIds.length; i += BATCH) {
		const batch = studentIds.slice(i, i + BATCH);
		// push batch to queue for background workers
		await pushBatchToQueue(batch, message);
	}
}

async function pushBatchToQueue(batch, message) {
	// Example: call local worker endpoint or publish to SQS/Rabbit
}
```

Shortcomings in naive implementation (synchronous send): fails midway and can't resume, too slow. Use retries, DLQ for failed items, and idempotency keys.

---

## Stage 6 — Priority inbox approach

Requirement: show top `n` important unread notifications (priority determined by type and recency).

Scoring approach:

score = weight(type) * alpha + freshnessScore

Example weights:
- Placement: 5
- Result: 4
- Event: 2

freshnessScore: exponential decay based on minutes since created, or simple recency multiplier (e.g., 1 / minutesAgo)

SQL example to compute top 10 (approx):

```sql
SELECT id, type, message, created_at,
	(CASE WHEN type='Placement' THEN 5 WHEN type='Result' THEN 4 ELSE 2 END) / EXTRACT(EPOCH FROM (now() - created_at))/60 AS score
FROM notifications
WHERE recipient_id = $1 AND is_read = false
ORDER BY score DESC
LIMIT 10;
```

For large scale, maintain a cached top-10 per user in Redis and refresh periodically or on new notification insertion.

---

## Stage 7 — Integrate logging middleware and final notes

Logging strategy implemented in this repo:
- `logging-middleware/src/index.js` provides `logInfo`, `logWarn`, `logError`, and `requestLogger`.
- Core routes and controllers call `logInfo`/`logError` with contextual metadata (method, path, ids, counts).
- Request lifecycle is logged (start / completed) with durationMs.

Integration checklist for production-readiness:

1. Ensure all controllers log meaningful context (user id, request id, action).
2. Add a request id to each request (UUID) and include it in logs for traceability.
3. Protect logging endpoint calls with retry/backoff and do not block request processing on logging failure.
4. Mask or avoid logging sensitive fields (PII, secrets) — only log IDs and non-sensitive metadata.

Example: Where logging is added

- In controllers: logAction('backend','info','controller','Notifications fetched',{count})
- On errors: logError('backend','error','controller','Failed to fetch', { error })

---

## Deliverables included in this repo

- Working Express backend (`notification-app-be`) implementing the API and controllers.
- React frontend (`notification-app-fe`) that queries the API, supports filter and pagination, and shows notifications.
- `logging-middleware` package that posts logs to the evaluation log API and prints local logs.
- `notification-system-design.md` (this document) with stage-by-stage answers.

---

If you want, I can also:
- Add a runnable `notify_all` worker script in `notification-app-be` that demonstrates batch processing against the sample data.
- Generate sample Postman collections and example screenshots (I cannot open your browser but can generate ready-to-use requests).

