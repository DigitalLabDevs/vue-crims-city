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

// =========================================================================================
// Pobieranie ilośc slotów gracza
// =========================================================================================
router.post('/game/player-slots', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;

  console.log(`ID => ${userId}`);

  try {
    // const slots = await getPlayerSlots(userId);
    const slots = await getPlayerEq(userId);

    if (slots.length > 0) {
      res.status(200).json(slots); // Zwróć pierwszy wynik jako obiekt JSON
    } else {
      res.status(404).json({ message: 'Nie znaleziono danych dla użytkownika' });
    }
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ message: 'Błąd serwera podczas pobierania danych budynków' });
  }
});
// =========================================================================================
// Funkcja do pobierania przedmiotów gracza z bazy danych na podstawie jego id i kategorii
// =========================================================================================
async function getPlayerSlots(userId) {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
        p_eq_slots
      FROM 
        players
      WHERE p_ids_user = ?
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
// =========================================================================================
// Funkcja do pobierania przedmiotów gracza z bazy danych na podstawie jego id i kategorii
// =========================================================================================
async function getPlayerEq(userId) {
  return new Promise((resolve, reject) => {
    let query = `
    SELECT players.p_eq_slots, players_items.*, items.*
    FROM players
    LEFT JOIN players_items ON players.p_ids_user = players_items.player_id
    LEFT JOIN items ON players_items.item_id = items.item_id
    WHERE players.p_ids_user = ?    
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
