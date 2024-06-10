const amqp = require('amqplib');
require('dotenv').config();

let connection;
let channel;

async function connectQueue() {
  if (!connection) {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
  }
}

async function createQueue(queueName) {
  if (!channel) await connectQueue();
  await channel.assertQueue(queueName);
}

async function sendToQueue(queueName, message) {
  if (!channel) await connectQueue();
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}

module.exports = { connectQueue, createQueue, sendToQueue };
