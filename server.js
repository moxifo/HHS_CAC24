// server.js

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Use the OpenAI API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// CORS configuration (if needed)
const cors = require('cors');
app.use(cors());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (response.ok) {
            const assistantReply = data.choices[0].message.content.trim();

            // Simple rating extraction (adjust as needed)
            let rating = 0;
            if (assistantReply.toLowerCase().includes('great')) rating = 10;
            else if (assistantReply.toLowerCase().includes('good')) rating = 5;
            else if (assistantReply.toLowerCase().includes('poor')) rating = -5;

            res.json({ reply: assistantReply, rating: rating });
        } else {
            // Handle API errors
            console.error('OpenAI API error:', data);
            res.status(500).json({ reply: 'Sorry, something went wrong with the assistant.' });
        }
    } catch (error) {
        console.error('Error fetching from OpenAI API:', error);
        res.status(500).json({ reply: 'Sorry, something went wrong.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

