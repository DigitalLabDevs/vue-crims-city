const express = require('express');
const path = require('path');
const connection = require('./db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware dla CORS

app.use(cors({
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length',
  maxAge: 600,
  optionsSuccessStatus: 204,
})
);

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint do obsługi żądań GET (przykładowy)
app.get('/api/ads', (req, res) => {
  // Przykładowe zapytanie do bazy danych
  connection.query('SELECT * FROM ads', (error, results, fields) => {
    if (error) {
      console.error('Błąd zapytania do bazy danych:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Zwracamy dane z bazy danych w formacie JSON
    res.json(results);
  });
});

// Obsługa żądań, które nie pasują do żadnego endpointu
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
