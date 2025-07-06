import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;

router.post('/', async (req, res) => {
  const { problem } = req.body;

  if (!problem) {
    return res.status(400).json({ error: 'Math problem is required' });
  }

  const prompt = `You are an expert mathematics tutor. Solve the following mathematical problem step by step with detailed explanations and final answer.\n\nProblem: ${problem}`;

  try {
    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    })
  }
);


    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Unknown Gemini API error');
    }

    const solution = data.candidates[0]?.content?.parts[0]?.text || 'Solution not found.';
    res.json({ solution });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
