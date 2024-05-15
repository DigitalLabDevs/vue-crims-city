const express = require('express');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

const PORT = process.env.PORT || 3000;

const registrationEndpoint = require('./endpoints/registrationEndpoint');

app.use(express.json());
// Middleware dla CORS
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Length',
    maxAge: 600,
    optionsSuccessStatus: 204,
  })
);

app.use(registrationEndpoint);



// Funkcje szyfrowania i deszyfrowania
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const text = 'Maharadża';

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(':');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Szyfrowania
const encryptedText = encrypt(text);
console.log('Zaszyfrowany tekst:', encryptedText);

 // Deszyfrowanie
 const decryptedText = decrypt(encryptedText);
 console.log('Odszyfrowany tekst:', decryptedText);


console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('API_KEY:', process.env.API_KEY);

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
