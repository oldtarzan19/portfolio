// functions/index.js
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const { onRequest } = require('firebase-functions/v2/https');
const Mailgun = require('mailgun.js');
const formData = require('form-data');

// Mailgun kliens
const mailgun = new Mailgun(formData);
const mgClient = mailgun.client({
  username: 'api',
  key: '',      // vagy functions.config().mailgun.key
  url: 'https://api.eu.mailgun.net'
});

// Express app
const app = express();

// 1. CORS beállítás: csak a trusted domainek
const allowedOrigins = [
  'https://pixelcode-portfolio.web.app',
  'https://pixelcode.hu'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS tiltva az origin miatt: ${origin}`));
  }
};

// Middleware-ek
app.use(cors(corsOptions));    // automatikusan kezeli az OPTIONS és a POST kéréseket
app.use(express.json());       // JSON body parse

// POST handler
app.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Minden mezőt ki kell tölteni' });
    }
    const domain = 'md.pixelcode.hu'; // Mailgun domain
    const result = await mgClient.messages.create(domain, {
      from: `${name} <${email}>`,
      to: 'zsofenszki.kristof@gmail.com',
      subject: 'Új üzenet a weboldalról',
      text: message
    });
    return res.status(200).json({ success: true, id: result.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// Export Gen2 HTTP function
exports.sendContactEmail = onRequest(
  { region: 'europe-west1' },  // régió
  app
);
