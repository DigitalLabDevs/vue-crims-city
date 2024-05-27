const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('../db');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { sendEmail } = require('../tools/emailUtils');
const { SYSTEM, API_URL } = require('../config'); // Importujemy plik konfiguracyjny

const { verifyJwtToken } = require('../tools/tokenTools');

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

router.post('/game/players', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;

  console.log(`ID => ${userId}`);
  // return;

  try {
    const { category } = req.body;
    // Zapytanie do bazy danych, aby pobrać wszystkie budynki
    const [items] = await getPlayerInfo(userId, category);
    console.log('userEqSlots:', items);
    const [userEqSlots] = await getPlayerEqSlots(userId);
    console.log('userEqSlots:', userEqSlots);



    // console.log(JSON.stringify(buildings));
    // console.log(`buildings: ${buildings}`);

    // Wysłanie danych w formacie JSON do frontendu
    res.status(200).json(items);
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ message: 'Błąd serwera podczas pobierania danych budynków' });
  }
});




// Funkcja do pobierania przedmiotów gracza z bazy danych na podstawie jego id i kategorii
async function getPlayerInfo(userId, category) {
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
             player_items.current_durability,
             players.p_eq_slots
      FROM 
        items
      INNER JOIN 
        player_items ON items.item_id = player_items.item_id
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

// Funkcja do pobierania przedmiotów gracza z bazy danych na podstawie jego id i kategorii
async function getPlayerEqSlots(userId) {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
        players.p_eq_slots
      FROM 
        players
      WHERE players.p_ids_user = ?
      LIMIT 1
    `;

    db.query(query, [userId], (error, results) => {
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
