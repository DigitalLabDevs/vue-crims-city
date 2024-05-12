const nodemailer = require('nodemailer');

// Funkcja do wysyłania e-maila
async function sendEmail(options) {
  try {
    // Utwórz transporter e-mail
    const transporter = nodemailer.createTransport({
      service: "ct8pl",
      host: "s1.ct8.pl",
      port: 587,
      secure: false, // use TLS
      // ignoreTLS: true,
      auth: {
        user: "activation@crims-city.ct8.pl",
        pass: "UPTSIcdYLmRX6oKIsNOfGWDY}285</",
      },
      tls: { rejectUnauthorized: false },
      debug: true,
      logger: true
    });

    // Wyślij e-mail
    const info = await transporter.sendMail(options);
    console.log('E-mail został wysłany:', info.response);
    return info;
  } catch (error) {
    console.error('Błąd podczas wysyłania e-maila:', error);
    throw error;
  }
}

// Eksportuj funkcję sendEmail
module.exports = { sendEmail };
