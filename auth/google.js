// // Backend Route to Handle Callback (auth/google.js):

// // you'll need to create a route to handle the callback from Google (i.e., /auth/google/callback). 
// // This route will handle the token exchange and user authentication.

// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// // This route handles the redirect after Google OAuth login
// router.get('/callback', async (req, res) => {
//     const { access_token } = req.query; // Extract the access token from the query params

//     try {
//         // Verify the access token with Google
//         const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
//         const userProfile = response.data;

//         // Here you would find or create the user in your database
//         // and manage user session or issue a JWT token
//         // Example:
//         // const user = await User.findOrCreate({ googleId: userProfile.id, email: userProfile.email });

//         // After successful authentication, you can redirect the user to the dashboard
//         res.redirect('/dashboard'); // Adjust this to your app’s flow
//     } catch (error) {
//         console.error('Error authenticating with Google:', error);
//         res.status(500).send('Authentication failed.');
//     }
// });

// module.exports = router;

const querystring = require('querystring');

// Function to get the Google OAuth URL
function getGoogleAuthUrl() {
    const params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/auth/google/callback`,
        response_type: 'token',
        scope: 'profile email',
        include_granted_scopes: 'true',
        state: 'pass-through value'
    };
    return `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(params)}`;
}

module.exports = {
    getGoogleAuthUrl
};
