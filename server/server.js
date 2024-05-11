const express = require('express');
const path = require('path');
const db = require('./db');
const bcrypt = require("bcrypt");
const cors = require('cors');

const { checkPasswordStrength } = require('./passwordUtils');

const app = express();
const PORT = process.env.PORT || 3000;
const SYSTEM = "SYSTEM:";
const saltRounds = 10;

app.use(express.json());

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

// app.use(express.static(path.join(__dirname, 'public')));





// Obsługa żądania rejestracji
app.post('/api/registration', (req, res) => {
  const { email, password } = req.body;

  console.log(`= >>> req.body:
  ${JSON.stringify(req.body, null, 2)}`);

  if (!email || !password) {
    res.status(400).json({ message: `${SYSTEM} Uzupełnij Dane` });
    return;
  }

  if(typeof email !== 'string' || typeof password !== 'string'){
    res.status(400).json({message: 'Not a string'});
    return;
  }

   // Sprawdź złożoność hasła
   const isStrongPassword = checkPasswordStrength(password, 6, 1, 1);
   if (!isStrongPassword) {
     res.status(400).json({ 
      message: `${SYSTEM} Hasło musi mieć minimum 6 znaków, 1 cyfrę i 1 znak specjalny.`,
      success: true,
    });
     return;
   }

  // Sprawdź, czy email istnieje w bazie danych
const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
db.query(checkEmailQuery, [email], async (error, results) => {
  if (error) {
    console.error('Błąd podczas sprawdzania adresu e-mail:', error);
    res.status(500).json({ message: `${SYSTEM} Błąd podczas sprawdzania adresu e-mail.` });
    return;
  } else if (results.length > 0) {
    res.status(400).json({ message: `${SYSTEM} Adres e-mail już istnieje.` });
    return;
  } else {
    // Haszuj hasło przed dodaniem użytkownika do bazy danych
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Dodaj nowego użytkownika do bazy danych
    const insertUserQuery = "INSERT INTO users (email, pass) VALUES (?, ?)";
    db.query(insertUserQuery, [email, hashedPassword], (insertError, insertResults) => {
      if (insertError) {
        res.status(500).json({ message: `${SYSTEM} Błąd podczas dodawania nowego użytkownika.` });
        return;
      } else {
        res.status(200).json({ message: `${SYSTEM} Pomyślnie zarejestrowano nowego użytkownika.` });
        return;
      }
    });
  }
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
