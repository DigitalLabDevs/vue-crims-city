const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const i18n = require('./language/i18nSetup');
const crypto = require('crypto');
const sessionManager = require('./tools/sessionManager');
const app = express();
const PORT = process.env.PORT;
const { API_URL } = require('./config');

const registrationEndpoint = require('./endpoints/registrationEndpoint');
const loginEndpoint = require('./endpoints/loginEndpoint');
const playerItems = require('./endpoints/playerItems');

app.use(express.json());
// Middleware dla CORS
app.use(
  cors({
    origin: API_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Length',
    // maxAge: parseInt(process.env.C_MAX_AGE),
    maxAge: 3600000,
    optionsSuccessStatus: 204,
  })
);

 // Middleware ustawiający język
app.use(i18n.setLocale);
// Middleware ustawiający headers
app.use(i18n.consoleLogHeaders); 
// Middleware SESSION
// app.use(sessionManager(app));
sessionManager(app);

// Middleware zapisujący adres IP użytkownika w danych sesji
app.use((req, res, next) => {
  // Odczytaj adres IP użytkownika z żądania
  const userIp = req.ip;
  // Jeśli dane sesji nie zawierają jeszcze adresu IP, zainicjuj je jako pusty obiekt
  if (!req.session.data) {
    req.session.data = {};
  }
  // Zapisz adres IP użytkownika w danych sesji
  req.session.data.user_ip = userIp;
  next();
});



app.use(registrationEndpoint);
app.use(loginEndpoint);
app.use(playerItems);



// // Funkcje szyfrowania i deszyfrowania
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
// const text = 'Maharadża';

// function encrypt(text) {
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return `${iv.toString('hex')}:${encrypted}`;
// }

// function decrypt(encryptedText) {
//   const [ivHex, encrypted] = encryptedText.split(':');
//   const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
//   let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// // Szyfrowania
// const encryptedText = encrypt(text);
// console.log('Zaszyfrowany tekst:', encryptedText);

//  // Deszyfrowanie
//  const decryptedText = decrypt(encryptedText);
//  console.log('Odszyfrowany tekst:', decryptedText);


// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('PORT:', process.env.PORT);
// console.log('DATABASE_URL:', process.env.DATABASE_URL);
// console.log('API_KEY:', process.env.API_KEY);

// ================ Obsługa żądań, które nie pasują do żadnego endpointu =======================

const staticFileMiddleware = express.static(path.join(__dirname, '..', 'frontend/dist'));
app.use(staticFileMiddleware);
app.get('/', function (req, res) {
  res.render(path.join(__dirname, '..', 'frontend/dist/index.html'));
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
});

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
