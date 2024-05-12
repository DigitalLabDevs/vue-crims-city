const express = require('express');
const path = require('path');
const db = require('./db');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { sendEmail } = require('./emailUtils');
const { checkPasswordStrength } = require('./passwordUtils');

const app = express();
const PORT = process.env.PORT || 3000;
const SYSTEM = 'SYSTEM:';
const saltRounds = 10;
const jwtSecret = 'tajny_klucz';
// const API_URL = 'https://crims-city.ct8.pl';
// const API_URL = 'http://localhost:5173';

let API_URL;

if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://crims-city.ct8.pl';
} else {
  API_URL = 'http://localhost:5173';
}

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


// Funkcja do generowania tokena
function generateToken(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}


// app.use(express.static(path.join(__dirname, 'public')));

// Obsługa żądania rejestracji
app.post('/api/registration', (req, res) => {
  const { email, password } = req.body;

  console.log(`= >>> req.body:
  ${JSON.stringify(req.body, null, 2)}`);

  if (!email || !password) {
    res.status(400).json({
      message: `${SYSTEM} Uzupełnij Dane`,
    });
    return;
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({
      message: 'Not a string',
      success: false,
    });
    return;
  }

  // Sprawdź złożoność hasła
  const isStrongPassword = checkPasswordStrength(password, 6, 1, 1);
  if (!isStrongPassword) {
    res.status(400).json({
      message: `${SYSTEM} Hasło musi mieć minimum 6 znaków, 1 cyfrę i 1 znak specjalny.`,
      code: 'PASSWORD_TOO_SHORT',
      success: false,
    });
    return;
  }

  // Sprawdź, czy email istnieje w bazie danych
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], async (error, results) => {
    if (error) {
      console.error('Błąd podczas sprawdzania adresu e-mail:', error);
      res.status(500).json({
        message: `${SYSTEM} Błąd podczas sprawdzania adresu e-mail.`,
      });
      return;
    } else if (results.length > 0) {
      res.status(400).json({
        message: `${SYSTEM} Adres e-mail już istnieje.`,
        code: 'EMAIL_EXIST',
        success: false,
      });
      return;
    } else {
      // Haszuj hasło przed dodaniem użytkownika do bazy danych
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Generuj token JWT
      const token = generateToken(64);

      // Dodaj nowego użytkownika do bazy danych
      const insertUserQuery =
        'INSERT INTO users (email, pass, registration_date, activation_token) VALUES (?, ?, NOW(), ?)';
      db.query(insertUserQuery, [email, hashedPassword, token], (insertError, insertResults) => {
        if (insertError) {
          res.status(500).json({
            message: `${SYSTEM} Błąd podczas dodawania nowego użytkownika.`,
          });
          return;
        } else {
          // Twórz link aktywacyjny zawierający token
          const activationLink = `${API_URL}/activation/${token}`;

          // Przygotuj e-mail z linkiem aktywacyjnym
          const mailOptions = {
            from: 'activation@crims-city.ct8.pl',
            to: email,
            subject: 'Aktywacja konta crims-city.ct8.pl',
            html: `<p>Kliknij <a href="${activationLink}">tutaj</a>, aby aktywować swoje konto.</p>`,
          };

          // Wyślij e-mail
          sendEmail(mailOptions)
            .then(() => console.log('E-mail został wysłany pomyślnie'))
            .catch(() => console.error('Wystąpił błąd podczas wysyłania e-maila'));

          // Odpowiedz klientowi z sukcesem
          res.status(200).json({
            message: `${SYSTEM} Pomyślnie zarejestrowano nowego użytkownika.`,
            code: 'REGISTRATION_SUCCESS',
            success: true,
          });
          return;
        }
      });
    }
  });
});






// Obsługa żądania aktywacji konta
app.get('/activation/:token', (req, res) => {
  const token = req.params.token;
  console.log(token);

  // Sprawdź, czy token istnieje w bazie danych
  findUserByToken(token)
    .then((user) => {
      if (user) {
        // Aktualizuj pole userBlock w bazie danych
        updateUserBlock(user)
          .then(() => {
            res.send('Twoje konto zostało pomyślnie aktywowane.');
          })
          .catch((error) => {
            console.error('Błąd podczas aktualizacji pola userBlock:', error);
            res.status(500).send('Wystąpił błąd podczas aktywacji konta.');
          });
      } else {
        res.status(400).send('Nieprawidłowy token aktywacyjny.');
      }
    })
    .catch((error) => {
      console.error('Błąd podczas aktywacji konta:', error);
      res.status(500).send('Wystąpił błąd podczas aktywacji konta.');
    });
});

// Funkcja do pobierania użytkownika z bazy danych na podstawie tokenu
async function findUserByToken(token) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby znaleźć użytkownika na podstawie tokenu
    const query = 'SELECT * FROM users WHERE activation_token = ?';
    db.query(query, [token], (error, results) => {
      if (error) {
        console.error('Błąd podczas wyszukiwania użytkownika:', error);
        reject(error);
      } else {
        // Jeśli użytkownik został znaleziony, zwróć go
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          // Jeśli użytkownik nie został znaleziony, zwróć null
          resolve(null);
        }
      }
    });
  });
}

// Funkcja do aktualizacji pola userBlock w bazie danych
async function updateUserBlock(user) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby zaktualizować pole userBlock
    const query = 'UPDATE users SET userBlock = ? WHERE ids = ?';
    db.query(query, [1, user.ids], (error, results) => {
      if (error) {
        console.error('Błąd podczas aktualizacji pola userBlock:', error);
        reject(error);
      } else {
        // Jeśli aktualizacja zakończyła się sukcesem, zwróć sukces
        resolve();
      }
    });
  });
}


// Obsługa żądań, które nie pasują do żadnego endpointu
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
