import express from 'express';
import { Contact } from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bk117134@gmail.com',
    pass: 'bk@31012004'
  }
});

// Create a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });
    
    await newContact.save();
    
    // Send email notification
    const mailOptions = {
      from: 'bk117134@gmail.com',
      to: 'bk117134@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(201).json({ success: true, contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

export const contactRouter = router;