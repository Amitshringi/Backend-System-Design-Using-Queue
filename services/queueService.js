const amqp = require('amqplib/callback_api');

async function enqueueRequest(username, request) {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0) {
                return reject(error0);
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    return reject(error1);
                }
                const queue = 'request_queue';
                const msg = JSON.stringify({ username, request });

                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(msg));

                console.log(' [x] Sent %s', msg);
                resolve();
            });
        });
    });
}

module.exports = { enqueueRequest };
