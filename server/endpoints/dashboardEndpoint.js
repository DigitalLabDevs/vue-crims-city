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
router.post('/game/dashboard', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;
  try {
    const results = await getPlayerDashboard(userId);
    console.log(userId);
    
    res.status(200).json(results);
    
  } catch (error) {
    console.error('Błąd dash', error);
    res.status(500).json({ message: 'Błąd serwera podczas pobierania danych budynków' });
  }
});
 
//=====================================================================================
// Funkcja do pobierania danych dla głównej tablicy
//=====================================================================================
async function getPlayerDashboard(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      p_ids_user,
      p_nick, 
      p_img, 
      p_money, 
      p_experience, 
      p_level,
      p_health_points,
      p_reputation
    FROM 
      players 
    WHERE 
      p_ids_user = ?;
    `;

    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania danych gracza:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = router;
