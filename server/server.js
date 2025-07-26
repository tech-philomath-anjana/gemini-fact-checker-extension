const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_KEY;

app.post("/gemini-check", async (req, res) => {
  const userText = req.body.content;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Check this content for factual accuracy and bias:\n\n${userText}`
          }]
        }]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ reply: "Gemini API error." });
  }
});

app.listen(3000, () => {
  console.log("Gemini backend running at http://localhost:3000");
});