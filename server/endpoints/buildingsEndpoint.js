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

router.post('/game/buildings', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;

  console.log(`/game/buildings - userEmail => ${userId}`);

  try {
    // Zapytanie do bazy danych, aby pobrać wszystkie budynki
    const buildings = await getAllBuildings(userId);

    console.log(JSON.stringify(buildings));
    console.log(`buildings: ${buildings}`);

    // Wysłanie danych w formacie JSON do frontendu
    res.status(200).json(buildings);
  } catch (error) {
    console.error('Błąd podczas pobierania danych z tabeli buildings:', error);
    res.status(500).json({ message: 'Błąd serwera podczas pobierania danych budynków' });
  }
});

// Funkcja do pobierania wszystkich budynków z bazy danych wraz z poziomem użytkownika
async function getAllBuildings(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    b.*, 
    pb.*
FROM 
    buildings b
LEFT JOIN 
    player_buildings pb ON b.buildings_ids = pb.pb_buildings_ids
WHERE 
    pb.pb_player_ids = ?;

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
