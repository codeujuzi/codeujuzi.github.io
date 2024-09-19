const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

const client = new OAuth2Client('YOUR_CLIENT_ID'); // Replace with your Google Client ID

// Verify Google ID token and create a session
router.post('/google/callback', async (req, res) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: 'YOUR_CLIENT_ID'
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];

        req.session.user = { userId, email, name };
        res.json({ success: true, message: 'User authenticated', user: { userId, email, name } });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Token verification failed' });
    }
});

module.exports = router;
