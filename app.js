require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the translation request
app.post('/translate', async (req, res) => {
    const { content, language } = req.body; // Receive language from the frontend

    // Map the selected language to its respective language prompt
    const languageMap = {
        swahili: 'Swahili',
        luganda: 'Luganda',
        amharic: 'Amharic'
    };

    const selectedLanguage = languageMap[language] || 'Swahili'; // Default to Swahili if no language is selected
console.log(selectedLanguage)
    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": `Translate the following text to ${selectedLanguage}: ${content}`
                }
            ],
            "model": "llama-3.1-70b-versatile",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false
        });

        const translatedText = chatCompletion.choices[0]?.message?.content;
        res.json({ translation: translatedText });

    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
