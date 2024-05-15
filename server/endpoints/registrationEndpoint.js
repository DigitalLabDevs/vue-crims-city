const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const { SYSTEM, saltRounds, API_URL } = require('../config'); // Importujemy plik konfiguracyjny
const { sendEmail } = require('../emailUtils');

const router = express.Router();


// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================

router.post('/api/set-new-password', async (req, res) => {

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      message: 'Brak wymaganych danych',
      success: true,
      code: 'INCOMPLETE_DATA'
    });
  }

  console.log(token);
  console.log(newPassword);

  const user = await getUserByResetToken(token);
  console.log(`/api/set-new-password: ${user}`);

  const update = await updateUserPassword(user, newPassword);
  console.log(`/api/set-new-password ${update}`);

  if(update){
    // clearResetToken(user);
    console.log('XXX');

    return res.status(200).json({
      message: 'Hasło zostało pomyślnie zaktualizowane',
      success: true,
      code: 'PASSWORD_SUCCESS_UPDATE',
      messages: 'success'
    });
  }

  return;

});

// Endpoint obsługujący resetowanie hasła na podstawie tokena
router.get('/reset-password', async (req, res) => {
  try {
    const { token } = req.query; // Pobierz token z parametru zapytania
    console.log("reset-password TOKEN: "+token);

    // Sprawdź, czy token istnieje w bazie danych
    const user = await getUserByResetToken(token);

    if (!user) {
      // Jeśli nie znaleziono użytkownika z podanym tokenem, przekieruj na stronę błędu
      return res.redirect('/error'); // Zdefiniuj odpowiednią ścieżkę do strony błędu
    }

    // Przekieruj użytkownika do aplikacji Vue, przekazując token w parametrze adresu URL
    res.redirect(`/reset-password/${token}`); // Użyj odpowiedniej ścieżki do resetowania hasła w aplikacji Vue
  } catch (error) {
    console.error('Błąd podczas resetowania hasła:', error);
    res.redirect('/error'); // Zdefiniuj odpowiednią ścieżkę do strony błędu
  }
});
// ============ Endpoint obsługujący żądanie przypomnienia hasła ==============
router.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: `${SYSTEM} Podaj adres e-mail`,
      code: `MISSING_EMAIL`,
      success: false,
    });
  }

  try {
    const userExists = await checkEmailExistence(email);
    if (!userExists) {
      return res.status(404).json({
        message: `${SYSTEM} Nie ma użytkownika z tym adresem e-mail`,
        code: `USER_NOT_FOUND`,
        success: true,
        messages: 'warning'
      });
    }

    const token = generateToken(64);
    console.log(`TOKEN FORGOT PASSWORD: ${token}`);
    // const hashedToken = await bcrypt.hash(token, saltRounds);
    // console.log(`HASHED TOKEN FORGOT PASSWORD: ${hashedToken}`);


    // Zapisz token w bazie danych
    const updateTokenQuery = 'UPDATE users SET reset_password_token = ? WHERE email = ?';
    await db.query(updateTokenQuery, [token, email]);

    // Wygeneruj link do resetowania hasła
    const resetLink = `${API_URL}/reset-password?token=${token}`;

    // Przygotuj e-mail z linkiem do resetowania hasła
    const mailOptions = {
      from: 'Forgot Password forgotpassword@crims-city.ct8.pl',
      to: email,
      subject: 'Reset password',
      html: `<h4>Zresetuj hasło do Crims City</h4>

      <p>Cześć! Zapomniałeś klucza do swojego wirtualnego biura w Crims City? Nie martw się, możesz łatwo zresetować hasło za pomocą tego linku:</p>
  
      <a href="${resetLink}" class="reset-link">Zresetuj hasło</a>
  
      <p>Po kliknięciu w link zostaniesz przeniesiony na stronę, gdzie będziesz mógł ustawić nowe hasło.</p>
  
      <p>Pamiętaj, aby używać silnego i unikalnego hasła, aby chronić swoje konto.</p>`,
    };

    // Wyślij e-mail z linkiem do resetowania hasła
    sendEmail(mailOptions)
      .then(() => {
        console.log('E-mail z linkiem do resetowania hasła został wysłany.');
        res.status(200).json({
          message: 'E-mail z linkiem do resetowania hasła został wysłany.',
          messages: 'success',
          code: 'EMAIL_WITH_RESET',
          success: true,
        });
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania e-maila:', error);
        res.status(500).json({
          message: `${SYSTEM} Błąd podczas wysyłania e-maila z linkiem resetującym hasło.`,
          success: false,
        });
      });
  } catch (error) {
    console.error('Błąd podczas przetwarzania żądania przypomnienia hasła:', error);
    res.status(500).json({
      message: `${SYSTEM} Wystąpił błąd podczas przetwarzania żądania przypomnienia hasła.`,
      success: false,
    });
  }
});
// ====================== /api/registration ===============================
router.post('/api/registration', async (req, res) => {
  const { email, password } = req.body;

  console.log(`= >>> req.body:
    ${JSON.stringify(req.body, null, 2)}`);

  if (!email || !password) {
    res.status(400).json({
      message: `${SYSTEM} Uzupełnij Dane`,
      code: `INCOMPLETE_DATA`,
      success: false,
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
      messages: 'warning',
      code: 'PASSWORD_TOO_SHORT',
      success: true,
    });
    return;
  }

  try {
    const emailExists = await checkEmailExistence(email);
    if (emailExists) {
      res.status(400).json({
        messages: 'warning',
        code: 'EMAIL_EXIST',
        success: true,
      });
      return;
    }

    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({
          messages: `${SYSTEM} Błąd podczas hashowania hasła.`,
          success: false,
        });
        return;
      }

      const token = generateToken(64);

      const insertUserQuery =
        'INSERT INTO users (email, pass, registration_date, activation_token) VALUES (?, ?, NOW(), ?)';
      db.query(insertUserQuery, [email, hashedPassword, token], (insertError, insertResults) => {
        if (insertError) {
          res.status(500).json({
            messages: `${SYSTEM} Błąd podczas dodawania nowego użytkownika.`,
            success: false,
          });
          return;
        }

        // Twórz link aktywacyjny zawierający token
        const activationLink = `${API_URL}/activation?token=${token}`;

        // Przygotuj e-mail z linkiem aktywacyjnym
        const mailOptions = {
          from: 'Activation activation@crims-city.ct8.pl',
          to: email,
          subject: 'Aktywacja konta crims-city.ct8.pl',
          html: `<p>Odblokuj bramy <strong style="font-style: italic;">Crims City</strong> i zanurz się w podziemnych przygodach, aktywuj swoje konto teraz!</p>
          <p>Kliknij <a href="${activationLink}" style="color: #0000ff; text-decoration: underline; font-style: italic;">tutaj</a>, aby aktywować swoje konto.</p>
          `,
        };

        // Wyślij e-mail
        sendEmail(mailOptions)
          .then(() => console.log('E-mail został wysłany pomyślnie'))
          .catch(() => console.error('Wystąpił błąd podczas wysyłania e-maila'));

        res.status(200).json({
          messages: 'success',
          code: 'REGISTRATION_SUCCESS',
          success: true,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: `${SYSTEM} Błąd podczas sprawdzania adresu e-mail.`,
      success: false,
    });
  }
});

router.get('/activation/:token', async (req, res) => {
  try {
    const token = req.params.token;
    // res.redirect(`/activation?success=false`);
    console.log(`TOKEN: ${token}`);

    const user = await findUserByToken(token);
    console.log(`USER: ${JSON.stringify(user)}`);

    if (!user) {
      return res.status(400).json({
        success: true,
        message: 'Konto zostało już aktywowane',
        code: 'ACCOUNT_ACTIVATE_DONE'
      });
    }

    await clearActivationToken(user); // Usunięcie tokenu aktywacyjnego po pomyślnej aktywacji

    return res.status(200).json({
      success: true,
      message: 'Konto zostało pomyślnie aktywowane.',
      code: 'ACCOUNT_ACTIVATE'
    });


    // res.redirect(`/activation?success=true`);
  } catch (error) {
    console.error('Błąd podczas aktywacji konta:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas aktywacji konta.',
    });
  }
});




























// ==================== Sprawdzanie siły hasła =================================
function checkPasswordStrength(password, minLength, minDigit, minSpecial) {
  // Sprawdź minimalną długość hasła
  if (password.length < minLength) {
    return false;
  }
  // Sprawdź obecność co najmniej jednej cyfry
  const digitRegex = /\d/;
  if (!digitRegex.test(password) || (password.match(digitRegex) || []).length < minDigit) {
    return false;
  }
  // Sprawdź obecność co najmniej jednego znaku specjalnego
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  if (!specialCharRegex.test(password) || (password.match(specialCharRegex) || []).length < minSpecial) {
    return false;
  }
  // Sprawdź obecność co najmniej jednej małej i jednej dużej litery
  const lowerCaseRegex = /[a-z]/;
  const upperCaseRegex = /[A-Z]/;
  if (!lowerCaseRegex.test(password) || !upperCaseRegex.test(password)) {
    return false;
  }
  // Hasło spełnia wszystkie kryteria
  return true;
}

// ============== Funkcja do aktualizacji pola userBlock w bazie danych ===============
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
        console.log(`updateUserBlock`);
        resolve();
      }
    });
  });
}

// ============ Funkcja do pobierania użytkownika z bazy danych na podstawie tokenu ==========
async function findUserByToken(token) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby znaleźć użytkownika na podstawie tokenu
    const query = 'SELECT ids FROM users WHERE activation_token = ?';
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

// ============= Funkcja do sprawdzania statusu blokady użytkownika ==============
async function checkUserBlock(user) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby sprawdzić pole userBlock
    const query = 'SELECT userBlock FROM users WHERE ids = ?';
    db.query(query, [user.ids], (error, results) => {
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

// =============  Funkcja sprawdzająca istnienie adresu e-mail w bazie danych ==============
async function checkEmailExistence(email) {
  return new Promise((resolve, reject) => {
    const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania adresu e-mail:', error);
        reject(error);
      } else {
        resolve(results.length > 0); // Zwraca true, jeśli adres e-mail istnieje, w przeciwnym razie false
      }
    });
  });
}

// ============= Funkcja do generowania tokena aktywacyjnego konta ====================
function generateToken(length = 32) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}

// Funkcja do pobierania użytkownika z bazy danych na podstawie tokenu resetowania hasła
async function getUserByResetToken(token) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT ids FROM users WHERE reset_password_token = ?';
    db.query(query, [token], (error, results) => {
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

// Funkcja do aktualizowania hasła użytkownika
function updateUserPassword(userId, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      // Zahaszuj nowe hasło
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      console.log("newPassword-HAshed: " + hashedPassword);
      
      // Zaktualizuj hasło użytkownika w bazie danych
      const query = 'UPDATE users SET pass = ? WHERE ids = ?';
      db.query(query, [hashedPassword, userId.ids], (error, results) => {
        if (error) {
          console.error('Błąd podczas aktualizacji hasła:', error);
          reject(error);
        } else {
          resolve(true); // Zwróć sukces, jeśli hasło zostało zaktualizowane poprawnie
          console.log(`updateUserPassword: SUKCES`);
        }
      });
    } catch (error) {
      console.error('Błąd podczas hashowania hasła:', error);
      reject(error); // Rzuć błąd, aby obsłużyć go na wyższym poziomie
    }
  });
}


// Funkcja do usuwania tokenu resetowania hasła użytkownika
async function clearResetToken(userId) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET reset_password_token = NULL WHERE ids = ?';
    db.query(query, [userId.ids], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania tokenu resetowania hasła:', error);
        reject(error);
      } else {
        resolve(true); // Zwróć sukces, jeśli token został usunięty poprawnie
        console.log(`clearResetToken: SUKCES`);
      }
    });
  });
}
// ================ Funkcja do usuwania tokenu aktywacyjnego =====================
async function clearActivationToken(user) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET activation_token = NULL WHERE ids = ?';
    db.query(query, [user.ids], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania tokenu aktywacyjnego:', error);
        reject(error);
      } else {
        resolve(); // Zwróć sukces, jeśli token został usunięty poprawnie
        console.log('ELOOOO');
      }
    });
  });
}



module.exports = router;
