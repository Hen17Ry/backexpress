const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const allowedOrigins = ['https://668dd9eebfe56b2f25b4e19e--curious-cheesecake-36ddb1.netlify.app']; // Liste des origines autorisées
  const origin = event.headers.origin;

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '', // Autoriser l'origine spécifique
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
  const { email, subject, message } = JSON.parse(event.body);

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'henry.gossou17@gmail.com', // replace with your email
      pass: 'oyke rcqm itlm iyot' // replace with your email password
    }
  });

  // Set up email data with unicode symbols
  let mailOptions = {
    from: email, // replace with your email
    to: 'henry.gossou17@gmail.com',
    subject: subject,
    text: message
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
