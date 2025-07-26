
require('dotenv').config({ path: '/Users/anjana/Documents/gemini-fact-checker-extension/server/.env' }); 
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log('🔑 GEMINI_API_KEY loaded:', !!GEMINI_API_KEY);

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing in .env');
}

app.post('/api/fact-check', async (req, res) => {
  const userText = req.body.content;

  if (!userText) {
    return res.status(400).json({ error: 'No content provided.' });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Check this content for factual accuracy and bias:\n\n${userText.slice(0, 100)}`
              }
            ]
          }
        ]
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    res.json({ reply });

  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({ reply: 'Gemini API error.' });
  }
});


app.listen(port, () => {
  console.log(`Gemini backend running at http://localhost:${port}`);
});