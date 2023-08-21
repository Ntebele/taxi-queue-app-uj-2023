import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';


const dbPromise = sqlite.open({
  filename: './taxi_queue.db',
  driver: sqlite3.Database,
});

export async function joinQueue() {
  const db = await dbPromise;
  await db.run('UPDATE taxi_queue set passenger_queue_count = passenger_queue_count+1');
}

export async function leaveQueue() {
  const db = await dbPromise;
  await db.run('UPDATE taxi_queue set passenger_queue_count = passenger_queue_count-1 ');
}

export async function joinTaxiQueue() {
  const db = await dbPromise;
  await db.run('INSERT INTO taxi_queue (taxi_queue_count) VALUES (1)');
}

export async function queueLength() {
  const db = await dbPromise;
  const row = await db.get('SELECT SUM(passenger_queue_count) as total FROM taxi_queue');
  return row ? row.total : 0;
}

export async function taxiQueueLength() {
  const db = await dbPromise;
  const row = await db.get('SELECT SUM(taxi_queue_count) as total FROM taxi_queue');
  return row ? row.total : 0;
}

export async function taxiDepart() {
    const db = await dbPromise;
  
    // Check if there are enough passengers in the queue (12 or more)
    const passengersCount = await queueLength();
    if (passengersCount >= 12) {
      // Remove a taxi from the taxi queue
      await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count - 1 WHERE rowid = (SELECT rowid FROM taxi_queue LIMIT 1)');
      
      // Remove 12 passengers from the passenger queue
      await db.run('DELETE FROM taxi_queue WHERE rowid IN (SELECT rowid FROM taxi_queue LIMIT 12)');
    }
  }