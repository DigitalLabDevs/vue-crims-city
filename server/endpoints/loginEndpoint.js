const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const { generateAccessToken, deleteSessionTokenFromDatabase }  = require('../tools/tokenTools');

const getUserByEmail = require('../tools/loginTools');
const router = express.Router();
// ================================ LOGIN ===================================
router.post('/api/login', async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Brak wymaganych danych',
      messages: 'info',
      success: true,
      isLoggedIn: false,
      code: 'INCOMPLETE_DATA',
    });
  }
  try {
    const userBlock = await checkUserBlock(email);

    if(userBlock === 1){
      return res.status(400).json({
        message: 'Użytkownik zablokowany',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: 'USER_BLOCKED',
      });
    }

    const user = await getUserByEmail(email);

    if(!user){
      return res.status(400).json({
        message: 'Nieprawidłowe dane logowania',
        messages: 'warning',
        success: true,
        isLoggedIn: false,
        code: 'WRONG_DATA'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.pass);

    if(!isPasswordValid){ 
      return res.status(400).json({
        message: 'Nieprawidłowe dane logowania',
        messages: 'warning',
        success: true,
        isLoggedIn: false,
        code: 'WRONG_DATA'
      });
    }

    const token = await generateAccessToken(user.ids);

    if(!token){
      return res.status(400).json({
        message: 'Ups',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: 'SOME_WRONG'
      });
    }

    const isupdateLoginCount = await updateLoginCount(email);

    if(!isupdateLoginCount){
      return res.status(400).json({
        message: 'Ups',
        messages: 'error',
        success: true,
        isLoggedIn: false,
        code: 'SOME_WRONG'
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
    console.error('Błąd logowania:', error);
    return res.status(500).json({
      message: `Wystąpił błąd podczas logowania - ${error}`,
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
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
// ===================== UPDATE LOGIN_COUNT +1 =======================
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



module.exports = router;
