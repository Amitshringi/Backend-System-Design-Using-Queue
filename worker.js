const amqp = require('amqplib');
const winston = require('winston');
require('dotenv').config();

const queueName = 'queue_';

(async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'worker.log' })
    ]
  });

  logger.info('Worker is ready to process requests');

  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      const request = JSON.parse(msg.content.toString());
      logger.info(`Processing request: ${JSON.stringify(request)}`);
      // Process the request
      channel.ack(msg);
    }
  });
})();
