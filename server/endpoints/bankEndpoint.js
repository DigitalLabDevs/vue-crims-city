const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { sendEmail } = require('../tools/emailUtils');
const { SYSTEM, API_URL } = require('../config'); // Importujemy plik konfiguracyjny

const { verifyJwtToken } = require('../tools/tokenTools');

const router = express.Router();
router.use(cookieParser());
//=====================================================================================
// Pobieranie danych po kliknięciu na dany budynek więcej informacji
//=====================================================================================
router.post('/game/bank', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;
  try {
    const result = await getPlayerMoney(userId);

    res.status(200).json(result);

    
  } catch (error) {
    console.error('Błąd Bank:', error);
  }
});

//=====================================================================================
// Funkcja do pobierania wszystkich budynków z bazy danych wraz z poziomem użytkownika
//=====================================================================================
async function getPlayerMoney(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      p_money
    FROM 
      players 
    WHERE 
      p_ids_user = ?;
    `;

    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania danych z tabeli buildings:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = router;
