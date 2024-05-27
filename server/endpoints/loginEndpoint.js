const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const { i18n } = require('../language/i18nSetup');

const { generateAccessToken, deleteSessionTokenFromDatabase } = require('../tools/tokenTools');

const serverLogs = require('../tools/server_logs');
const router = express.Router();
// ================================ LOGIN ===================================
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  
  try {
  // =======================================================================
  // Sprawdzenie czy email lub hasło nie jest puste
  // =======================================================================
    if (!email || !password) {
      return res.status(400).json({
        message: 'Brak wymaganych danych',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
      });
    }
// =======================================================================
  // Sprawdzenie czy użytkownik istnieje
  // =======================================================================
    const userDetails = await checkUserDetails(email);

    if (!userDetails) {
      return res.status(400).json({
        message: 'Brak użytkownika',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }
  // =======================================================================
  // Sprawdzenie czy użytkownik jest zablokowany
  // =======================================================================
    if (userDetails.userBlock === 1) {
      return res.status(400).json({
        message: 'Użytkownik zablokowany',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.USER_BLOCKED')}`,
      });
    }
  // =======================================================================
  // Czy konto zostało aktywowane
  // =======================================================================
    if (userDetails.isActivationTokenNull === false) {
      return res.status(400).json({
        message: 'Nieaktywne konto',
        messages: 'info',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.ACCOUNT_ACTIVATE_FALSE')}`,
      });
    }
  // =======================================================================
  // Pobieranie ids, email, hasło
  // =======================================================================
    const user = await getUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.pass);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Nieprawidłowe dane logowania',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    const token = await generateAccessToken(user.ids);

    if (!token) {
      return res.status(400).json({
        message: 'Ups',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    const isupdateLoginCount = await updateLoginCount(email);

    if (!isupdateLoginCount) {
      return res.status(400).json({
        message: 'Ups',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    // Pomyślne logowanie

    req.session.user = { email };

    res.cookie(process.env.AT_NAME, token.accessToken, {
      httpOnly: true,
      sameSite: process.env.C_SAMESITE,
      secure: process.env.C_SECURE,
      maxAge: process.env.C_MAX_AGE,
    });

    res.cookie(process.env.ST_NAME, token.sessionToken, {
      httpOnly: false,
      sameSite: process.env.C_SAMESITE,
      secure: process.env.C_SECURE,
      maxAge: process.env.C_MAX_AGE,
    });

    return res.status(200).json({
      message: 'Logowanie przebiegło pomyślnie',
      success: false,
      isLoggedIn: true,
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Wystąpił błąd podczas logowania - ${error}`,
      success: true,
      code: `SOME_WRONG`,
      messages: 'error',
    });
  }
});
// ============================ LOGOUT ================================
router.post('/api/logout', async (req, res, next) => {
  const sessionToken = req.sessionToken;
  console.log(`API/LOGOUT ${sessionToken}`);

  await deleteSessionTokenFromDatabase(sessionToken);

  // Usuń dane sesji
  req.session.destroy((err) => {
    if (err) {
      console.error('Błąd podczas usuwania sesji:', err);
      return res.status(500).json({
        message: 'Wystąpił błąd podczas wylogowywania',
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        messages: 'error',
      });
    }
    // Usuń ciasteczka zawierające token sesji
    res.clearCookie(process.env.AT_NAME);
    res.clearCookie(process.env.ST_NAME);
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).json({
      success: true,
      message: 'Wylogowanie przebiegło pomyślnie',
      messages: 'success',
      code: 'LOGOUT_SUCCESS',
      isLoggedIn: false,
    });
  });
});
// ===============================================================================
// Funkcja do sprawdzania statusu blokady użytkownika
// ===============================================================================
async function isActivationTokenNull(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT activation_token FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pola activation_token', error);
        serverLogs(`Błąd podczas sprawdzania pola activation_token', ${error}`);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0].activation_token === null);
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}

// ===============================================================================
// Funkcja do sprawdzania statusu blokady użytkownika
// ===============================================================================
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
// ===============================================================================
// UPDATE LOGIN_COUNT +1
// ===============================================================================
async function updateLoginCount(email) {
  return new Promise((resolve, reject) => {
    // Pobierz aktualną liczbę logowań użytkownika
    const queryGetCount = 'SELECT login_count FROM users WHERE email = ?';
    db.query(queryGetCount, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania liczby logowań użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          const loginCount = results[0].login_count;
          const updatedLoginCount = loginCount + 1;

          // Zaktualizuj liczbę logowań użytkownika w bazie danych
          const queryUpdateCount = 'UPDATE users SET login_count = ?, login_date = NOW() WHERE email = ?';
          db.query(queryUpdateCount, [updatedLoginCount, email], (error) => {
            if (error) {
              console.error('Błąd podczas aktualizacji liczby logowań użytkownika:', error);
              reject(error);
            } else {
              resolve(true);
            }
          });
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}
// ===============================================================================
// Sprawdzenie czy użytkownik jest zablokowany i czy aktywował konto
// ===============================================================================
async function checkUserDetails(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT activation_token, userBlock, email FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania użytkownika:', error);
        reject(error);
      } else {
        // console.log('Wyniki zapytania:', results); // Debugowanie wyników zapytania
        if (results.length > 0) {
          const { activation_token, userBlock, email: userEmail } = results[0];
          resolve({
            isActivationTokenNull: activation_token === null,
            userBlock,
            email: userEmail
          });
        } else {
          // console.log(`KUTAS`); // Debugowanie wyników zapytania
          resolve(false); 
          // reject(null); // Zwraca null, jeśli użytkownik nie został znaleziony
        }
      }
    });
  });
}
 
// ===============================================================================
// Funkcja do pobierania użytkownika z bazy danych na podstawie adresu e-mail
// ===============================================================================
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT pass, ids FROM users WHERE email = ? LIMIT 1';
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


module.exports = router;
