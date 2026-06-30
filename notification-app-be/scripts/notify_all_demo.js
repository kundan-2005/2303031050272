// notify_all_demo.js
// Demonstration script for batching notifications. Safe to run locally.

import fs from 'fs';

async function pushBatch(batch, message) {
  // In a real system this would push to a queue (SQS/Rabbit) or call worker endpoints.
  console.log(`Pushing batch of ${batch.length} notifications`);
  // Simulate async delay
  await new Promise((r) => setTimeout(r, 200));
}

export async function notify_all(studentIds, message) {
  const BATCH = 500;
  for (let i = 0; i < studentIds.length; i += BATCH) {
    const batch = studentIds.slice(i, i + BATCH);
    await pushBatch(batch, message);
  }
  console.log('All batches pushed');
}

// Demo runner
if (import.meta.url === `file://${process.argv[1]}`) {
  const students = Array.from({ length: 1200 }, (_, i) => i + 1);
  notify_all(students, 'Campus-wide announcement').then(() => process.exit(0));
}
