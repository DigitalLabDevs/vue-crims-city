const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('../db');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { sendEmail } = require('../tools/emailUtils');
const { SYSTEM, API_URL } = require('../config'); // Importujemy plik konfiguracyjny

const router = express.Router();
router.use(cookieParser());

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

router.post('/game/player-items', async (req, res) => {
  // Pobierz ciasteczka z nagłówków żądania
  const cookies = req.cookies;

  // Sprawdź, czy ciasteczka są zdefiniowane i czy zawierają token JWT
  if (!cookies || !cookies['Lz^T1']) {
    return res.status(401).json({ error: 'Brak tokena JWT w ciasteczkach' });
  }

  // Sprawdź, czy ciasteczka zawierają token JWT
  const jwtToken = cookies['Lz^T1'];

  if (!jwtToken) {
    return res.status(401).json({ error: 'Brak tokena JWT w ciasteczkach' });
  }

  try {
    // Zdekoduj token JWT
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_KEY); // Tu wpisz swój sekret JWT

    // Wypisz zdekodowany token w konsoli
    console.log('Zdekodowany token JWT:', decodedToken);

    const userId = decodedToken.userEmail;
    console.log(`ID: ${userId}`);

    const { category } = req.body;

    const items = await getPlayerItems(userId, category);
    
    console.log(`items: ${JSON.stringify(items)}`);
    // return;

    // Zwróć przedmioty gracza jako JSON
    res.status(200).json(items);
  } catch (error) {
    console.error('ERROR:', error);
    return res.status(401).json({ error: 'Nieprawidłowy token JWT' });
  }
});




// Funkcja do pobierania przedmiotów gracza z bazy danych na podstawie jego id i kategorii
async function getPlayerItems(userId, category) {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT items.name,
             items.description,
             items.img_url,
             items.category,
             items.attack,
             items.defense,
             items.price,
             items.weight,
             player_items.current_durability
      FROM items
      INNER JOIN player_items ON items.item_id = player_items.item_id
      WHERE player_items.player_id = ?
    `;

    // Dodaj warunek WHERE dla kategorii, jeśli została przekazana
    if (category) {
      query += ` AND items.category = ?`;
    }

    db.query(query, category ? [userId, category] : [userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania przedmiotów gracza:', error);
        reject(error);
      } else {
        resolve(results); // Zwróć wyniki zapytania
      }
    });
  });
}


module.exports = router;
