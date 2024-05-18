const db = require('../db');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const sessionToken = uuidv4();

// Tworzenie tokenu JWT httpOnly
async function generateAccessToken(userEmail) {
  try {
    // Dane do zapisania w tokenie
    const payload = {
      userEmail: userEmail,
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



// Eksportowanie obu funkcji
module.exports = { 
  generateAccessToken, 
  deleteSessionTokenFromDatabase 
};
