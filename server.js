const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/send-whatsapp', async (req, res) => {
  const { phone, ticketId, message, status } = req.body;

  try {
    const response = await fetch('https://graph.facebook.com/v19.0/653593054498965/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer EAANRRuI9XKQBO3HnaRBNodUPE7PXTntK0ZA3YNg1U2H9rZAKyjuVITs1NLsHTfSgFoZAAa5U45p9c8FOco9eZBAWtIy5wohvq0nwMpCaZAjuoaXLjsEZBlKPil7lpRjYJhpUkt6bETQehJuaSumZAxBdgKnDEAJkcekEbyBJxMHhKAOd9kECNWXjxuvJlfl03gZBTfpUyZAgJjFXoulzhKF5YwqW4WtOXyPAZD`
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: "complaint_status_update",
          language: { code: "en_US" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: ticketId },
                { type: "text", text: message },
                { type: "text", text: status }
              ]
            }
          ]
        }
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 WhatsApp backend running');
});
