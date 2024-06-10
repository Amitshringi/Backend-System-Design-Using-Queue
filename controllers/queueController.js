const queueService = require('../services/queueService');

async function enqueueRequest(req, res) {
    try {
        const { request } = req.body;
        console.log('Request Body:', JSON.stringify(req.body, null, 2)); // Log the entire body
        console.log('User:', JSON.stringify(req.user, null, 2)); // Log the user information

        if (!req.user || !req.user.username) {
            throw new Error('User information is missing');
        }

        if (!request || !request.status) {
            throw new Error('Request information is missing or incomplete');
        }

        await queueService.enqueueRequest(req.user.username, request);
        res.send('Request enqueued');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send(error.message);
    }
}

module.exports = { enqueueRequest };
