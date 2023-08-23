import express from "express";

// use the SQL methods in the API routes below
import {joinQueue, leaveQueue, joinTaxiQueue, queueLength,taxiQueueLength,taxiDepart} from './taxi.sql.js';

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

// passenger joins the queue
app.post('/api/passenger/join', async (req, res) => {
    await joinQueue()
    res.json({
        message : 'join queue'
    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', async (req, res) => {
    await leaveQueue()
    res.json({
        message : 'leave queue'
    })
});
// taxi joins queue
app.post('/api/taxi/join', async (req, res) => {
    await joinTaxiQueue()
    res.json({
        message : 'leave queue'
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async (req, res) => {
    await taxiDepart()
    res.json({
        message : 'taxi depart from queue'
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', async (req, res) => {
    const count=await queueLength()
    res.json({
        queueCount : count
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async (req, res) => {
   const count= await taxiQueueLength()
    res.json({
        queueCount : count
    })
});
console.log(await queueLength())
console.log(await taxiQueueLength())
app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))