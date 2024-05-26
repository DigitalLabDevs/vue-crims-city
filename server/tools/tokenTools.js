const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const sessionToken = uuidv4();
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());




// ==================== Middleware do weryfikacji tokenu JWT ==========================
async function verifyJwtToken(req, res, next) {
  try {
    // Pobierz token JWT z ciasteczek
    const token = req.cookies['Lz^T1'];
    if (!token) {
      return res.status(401).json({ message: 'Brak tokenu uwierzytelniającego' });
    }

    // Weryfikacja tokenu JWT
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Sprawdzenie, czy token sesji istnieje w bazie danych
    const sessionToken = decoded.sessionId;
    const session = await getSessionFromDatabase(sessionToken);

    // console.log(`verifyJwtToken: ${JSON.stringify(session)}`);

    if (!session) {
      return res.status(401).json({ message: 'Nieprawidłowy token sesji' });
    }

    // Przypisanie danych użytkownika do requestu
    req.user = decoded;

    console.log(`${JSON.stringify(req.user)}`);

    // Kontynuowanie do następnego middleware lub trasy
    next();
  } catch (error) {
    console.error('Błąd weryfikacji tokenu JWT:', error);
    res.status(401).json({ message: 'Nieprawidłowy token uwierzytelniający' });
  }
}

// ========================= Tworzenie tokenu JWT httpOnly ==========================
async function generateAccessToken(userEmail, userId = null) {
  try {
    // Dane do zapisania w tokenie
    const payload = {
      userEmail: userEmail,
      ids: userId,
      sessionId: sessionToken // Generowanie unikalnego identyfikatora sesji
      // Dodaj dodatkowe dane, jeśli są potrzebne
    };

    // Wygenerowanie tokenu JWT
    const sessionJwtToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' }); // Ustawienie czasu wygaśnięcia na 1 godzinę

    // Tutaj zapisz sesję w sesji, np. z użyciem Express Session
    // req.session.session_token = sessionToken;

    // Zwróć wygenerowany token sesji
    saveSessionTokenInDatabase(userEmail, sessionJwtToken ,sessionToken);
    return { accessToken: sessionJwtToken, sessionToken: sessionToken };
  } catch (error) {
    console.error('Błąd podczas generowania tokena sesji:', error);
    throw new Error('Błąd podczas generowania tokena sesji');
  }
}


// Funkcja zapisująca token sesji w bazie danych
async function saveSessionTokenInDatabase(userEmail, sessionJwtToken, sessionToken) {
  return new Promise((resolve, reject) => {
    // Tutaj używamy zapytania INSERT, aby wstawić nowy rekord z tokenem sesji
    const saveTokenQuery = 'INSERT INTO sessions (email, access_token, session_token, login_date) VALUES (?, ?, ?, NOW())';
    db.query(saveTokenQuery, [userEmail, sessionJwtToken, sessionToken], (error, results) => {
      if (error) {
        console.error('Błąd podczas zapisywania tokenu sesji w bazie danych:', error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
// Funkcja usuwa token sesji w bazie danych
async function deleteSessionTokenFromDatabase(sessionToken) {
  return new Promise((resolve, reject) => {
    // Tutaj używamy zapytania DELETE, aby usunąć rekord z danym tokenem sesji
    const deleteTokenQuery = 'DELETE FROM sessions WHERE session_token = ?';
    db.query(deleteTokenQuery, [sessionToken], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania tokenu sesji z bazy danych:', error);
        reject(error);
      } else {
        console.log('Token sesji został pomyślnie usunięty z bazy danych.');
        resolve();
      }
    });
  });
}


// Funkcja usuwa token sesji w bazie danych
async function deleteAccessTokenFromDatabase(sessionToken) {
  return new Promise((resolve, reject) => {
    // Tutaj używamy zapytania DELETE, aby usunąć rekord z danym tokenem sesji
    const deleteTokenQuery = 'DELETE FROM sessions WHERE session_token = ?';
    db.query(deleteTokenQuery, [sessionToken], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania tokenu sesji z bazy danych:', error);
        reject(error);
      } else {
        console.log('Token sesji został pomyślnie usunięty z bazy danych.');
        resolve();
      }
    });
  });
}


// Funkcja do pobrania sesji z bazy danych
async function getSessionFromDatabase(sessionToken) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM sessions WHERE session_token = ?';
    db.query(query, [sessionToken], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania sesji z bazy danych:', error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}



// Eksportowanie obu funkcji
module.exports = { 
  generateAccessToken, 
  deleteSessionTokenFromDatabase,
  verifyJwtToken
};
