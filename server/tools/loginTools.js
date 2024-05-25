const db = require('../db');

// Funkcja do pobierania użytkownika z bazy danych na podstawie adresu e-mail
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT email, pass, ids FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Zwróć użytkownika, jeśli został znaleziony
        } else {
          resolve(null); // Zwróć null, jeśli użytkownik nie został znaleziony
        }
      }
    });
  });
}

module.exports = getUserByEmail;
