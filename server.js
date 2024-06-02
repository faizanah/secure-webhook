const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const SECRET = process.env.SECRET || 'your_shared_secret'; // ENTER YOUR SHARED SECRET HERE
const MAX_TIME_DIFFERENCE = +process.env.MAX_TIME_DIFFERENCE || 60;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Function to verify the signature
const verifySignature = (secret, payload, signature) => {
    if (!secret || !payload || !signature) return false;
    const digest = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(digest, 'utf-8'), Buffer.from(signature, 'utf-8'));
};

// Middleware to verify the signature and timestamp of incoming webhook requests
const verifySignatureMiddleware = (secret, timeDifference) => {
    return (req, res, next) => {
        const signature = req.headers['x-signature'];
        const timestamp = req.headers['x-timestamp'];
        const payload = req.body;

        // Check if signature or timestamp headers are missing
        if (!signature || !timestamp) {
            return res.status(401).json({ error: 'Signature or timestamp header is missing' });
        }

        // Validate timestamp
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (Math.abs(currentTimestamp - timestamp) > timeDifference) {
            return res.status(401).json({ error: 'Expired timestamp' });
        }

        // Check if the payload is valid
        if (!payload?.event || !payload?.data) {
            return res.status(400).json({ error: 'Invalid payload' });
        }

        // Verify the signature
        const payloadWithTimestamp = JSON.stringify(req.body) + timestamp;
        if (!verifySignature(secret, payloadWithTimestamp, signature)) {
            return res.status(403).json({ error: 'Invalid signature' });
        }
        next();
    };
};

// Endpoint to receive webhook payloads
app.post('/webhook', verifySignatureMiddleware(SECRET, MAX_TIME_DIFFERENCE), (req, res) => {
    console.log('Received webhook payload:', req.body);
    const { event, data } = req.body;

    // Example: handling a specific event
    if (event === 'user.created') {
        console.log(`New user created: ${data.id}`);
        // Add your logic here to handle the new user creation
    }

    res.status(200).send('Webhook received successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Secure webhook server running on port ${PORT}`);
});
