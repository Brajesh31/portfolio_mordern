import express from 'express';
import OpenAI from 'openai';
import { Message } from '../models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a helpful assistant for Brajesh Kumar's portfolio. You answer questions related to his projects, skills, experience, certifications, and also general technical queries.

Key Information:
- Projects: Emma (AI Assistant), Thea (AI Therapist), SEM&C (Education Platform), IdeaPool (Developer Collaboration)
- Skills: MERN Stack, Python, ML/AI, DevOps, Cloud Technologies
- Certifications: IBM, Google Cloud, Coursera
- Experience: Multiple internships in Python development, web design, and AI systems

Keep responses concise and relevant to the portfolio context.`;

router.post('/', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Save user message
    await Message.create({
      sender: 'user',
      message,
      sessionId
    });

    // Get chat completion from OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 500
    });

    const botResponse = completion.choices[0].message.content;

    // Save bot response
    await Message.create({
      sender: 'bot',
      message: botResponse,
      sessionId
    });

    res.json({ message: botResponse });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await Message.find({ sessionId }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

export const chatRouter = router;