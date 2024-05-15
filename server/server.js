const express = require('express');
const path = require('path');
const cors = require('cors');
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
