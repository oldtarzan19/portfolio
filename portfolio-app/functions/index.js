import { onRequest } from "firebase-functions/v2/https";
import axios from "axios";

const MAILGUN_KEY = process.env.MAILGUN_KEY;
const MAILGUN_DOMAIN  = process.env.MAILGUN_DOMAIN;

export const sendContactEmail = onRequest(
  { cors: [
      "https://pixelcode.hu",
      "https://www.pixelcode.hu",
      "https://pixelcode-portfolio.web.app"
    ], region: "europe-west3" },
  async (req, res) => {
    // Csak POST-ot fogadunk el
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).send("Missing form fields");
    }

    if (!MAILGUN_KEY || !MAILGUN_DOMAIN) {
      console.error("Mailgun configuration missing");
      return res.status(500).send("Server configuration error");
    }

    // Üzenet előkészítése
    const messageBody = `Név: ${name}\n\n` +
                         `Email: ${email}\n\n` +
                         `Üzenet:\n${message}`;

    // Basic Auth előállítása
    const authHeader = Buffer
      .from(`api:${MAILGUN_KEY}`)
      .toString("base64");

    // Form adatok felépítése
    const params = new URLSearchParams();
    params.append("from",    "Pixelcode <postmaster@mg.pixelcode.hu>");
    params.append("to",      "zsofenszki.kristof@gmail.com");
    params.append("subject", "Új kapcsolatfelvételi üzenet");
    params.append("text",    messageBody);

    try {
      // POST a Mailgun API-hoz
      await axios.post(
        `https://api.eu.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
        params,
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      // Sikeres küldés
      return res.status(200).send("Email sent");
    } catch (err) {
      console.error("Mailgun error:", err.response?.data || err.message);
      return res.status(500).send("Error sending email");
    }
  }
);
