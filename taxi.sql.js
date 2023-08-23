import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});

await db.migrate();

export async function joinQueue() {
    const sql = `update taxi_queue set passenger_queue_count = passenger_queue_count + 1`;
    //console.log(await db.run(sql))
    await db.run(sql);
}

export async function leaveQueue() {
    const sql = `update taxi_queue set passenger_queue_count = max(0, passenger_queue_count - 1)`;
    await db.run(sql);
}

export async function joinTaxiQueue() {
    const sql = `update taxi_queue set taxi_queue_count = taxi_queue_count + 1`;
    await db.run(sql);
}

export async function queueLength() {
    const result = await db.get(`SELECT passenger_queue_count FROM taxi_queue`);
    //console.log(result)
    //console.log(result.passenger_queue_count)
    return result.passenger_queue_count;
}

export async function taxiQueueLength() {
    const result = await db.get(`SELECT taxi_queue_count FROM taxi_queue`);
    return result.taxi_queue_count;
}

export async function taxiDepart() {
    const result = await db.get(`SELECT passenger_queue_count, taxi_queue_count FROM taxi_queue`);
    console.log(result.passenger_queue_count)
    console.log(result.taxi_queue_count)
    if (result.passenger_queue_count >= 12 && result.taxi_queue_count > 0) {
       return  await db.run(`update taxi_queue set passenger_queue_count = passenger_queue_count - 12, taxi_queue_count = taxi_queue_count - 1`);
    }
    else{
      return
    }
}