require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const path = require('path');

const axios = require('axios'); // For handling HTTP requests
const querystring = require('querystring');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(bodyParser.json());

// Serve static files like index.html
app.use(express.static(path.join(__dirname, 'public')));

// Route for the translation request
app.post('/translate', async (req, res) => {
    const { content } = req.body;

    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": `Translate the following text to Swahili: ${content}`
                }
            ],
            "model": "llama-3.1-70b-versatile",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false
        });

        const translatedText = chatCompletion.choices[0]&&chatCompletion.choices[0].message&&chatCompletion.choices[0].message.content;
        res.json({ translation: translatedText });

    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed.' });
    }
});

// Google OAuth routes
app.get('/auth/google', (req, res) => {
    const params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/auth/google/callback`,
        response_type: 'token',
        scope: 'profile email',
        include_granted_scopes: 'true',
        state: 'pass-through value'
    };
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(params)}`;
    res.redirect(url);
});

app.get('/auth/google/callback', (req, res) => {
    const { access_token } = req.query;
    
    if (access_token) {
        // Store the token or handle user authentication
        res.redirect('/homepage.html'); // Redirect to a secured page
    } else {
        res.status(401).json({ error: 'Authentication failed' });
    }
});


// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve other pages
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

app.get('/outline', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'outline.html'));
});

app.get('/course', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'course.html'));
});



// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
