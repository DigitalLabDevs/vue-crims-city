const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
// const { sendEmail } = require('../emailUtils');
const { SYSTEM, saltRounds, API_URL } = require('../config'); // Importujemy plik konfiguracyjny

const generateAccessToken = require('../tools/tokenTools');

const getUserByEmail = require('../tools/loginTools');
const router = express.Router();
// ================================ LOGIN ===================================
router.post('/api/login', async (req, res) => {
  console.log('Nagłówki żądania:');
  console.log(req.headers);
  console.log('==========================================');
  const { email, password } = req.body;

  console.log(`LOGIN email: ${email}`);
  console.log(`LOGIN password: ${password}`);

  if (!email || !password) {
    return res.status(400).json({
      message: 'Brak wymaganych danych',
      success: true,
      code: 'INCOMPLETE_DATA',
      messages: 'warning',
    });
  }
  try {
    const userBlock = await checkUserBlock(email);
    console.log(`userBlock: ${userBlock}`);

    const user = await getUserByEmail(email);
    console.log(`getUserByEmail EMAIL: ${user.email}`);
    console.log(`getUserByEmail PASS: ${user.pass}`);

    const isPasswordValid = await bcrypt.compare(password, user.pass);
    console.log(`isPasswordValid: ${isPasswordValid}`);

    if (isPasswordValid) {
      const token = await generateAccessToken(email);
      console.log(`ACCESS TOKEN: ${token.accessToken}`);

      res.cookie('access_token', token.accessToken, {
        httpOnly: true,
        // sameSite: "None",
        // sameSite: "Lax",
        // sameSite: "Strict",
        // Wymagane, jeśli SameSite ustawione na "None" i nie jesteś na HTTPS
        // secure: true,
        secure: false,
        // maxAge: 24 * 60 * 60 * 1000, // 24h
        maxAge: 60 * 60 * 1000, // 1h
      });

      res.cookie('session_token', token.sessionToken, {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 1000, // 1h
      });

      return res.status(200).json({
        message: 'Logowanie przebiegło pomyślnie',
        success: false,
        isLoggedIn: true,
        email: email,
        // code: 'PASSWORD_SUCCESS_UPDATE',
        // messages: 'success'
      });
    }
  } catch (error) {
    console.error('Błąd logowania:', error);
    return res.status(500).json({
      message: 'Wystąpił błąd podczas logowania',
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      messages: 'error',
    });
  }
});

// ============= Funkcja do sprawdzania statusu blokady użytkownika ==============
async function checkUserBlock(email) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby sprawdzić pole userBlock
    const query = 'SELECT userBlock FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pola userBlock:', error);
        reject(error);
      } else {
        // Jeśli zapytanie zwróciło wynik, zwróć status blokady użytkownika (0 lub 1)
        if (results.length > 0) {
          resolve(results[0].userBlock);
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}

module.exports = router;
