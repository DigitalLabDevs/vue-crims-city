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
// Zaposywanie save-item-position
// =========================================================================================
router.post('/game/save-item-position', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;
  const { itemId, newPosition } = req.body;

  console.log(`======================================================`);
  console.log(`ID => ${userId}`);
  console.log(`itemId: ${itemId}`);
  console.log(`newPosition: ${newPosition}`);
  console.log(`======================================================`);

  try {
    await saveItemPosition(userId, itemId, newPosition);
    // const slots = await getPlayerEq(userId);

    // if (slots.length > 0) {
    //   res.status(200).json(slots);
    // } else {
    //   res.status(404).json({ message: 'Nie znaleziono danych dla użytkownika' });
    // }
    res.status(200).json({message: 'OK'});
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ message: 'Błąd serwera podczas aktualizacji pozycji przedmiotu' });
  }
});
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
// =========================================================================================
// Funkcja do aktualizacji pozycji przedmiotu w bazie danych
// =========================================================================================
async function saveItemPosition(userId, itemId, newPosition) {
  try {
    const checkQuery = `
      SELECT item_id FROM players_items
      WHERE player_id = ? AND item_slot = ?
    `;
    db.query(checkQuery, [userId, newPosition], async (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pozycji przedmiotu:', error);
        throw error;
      } else {
        if (results.length > 0) {
          // Jeśli na nowej pozycji jest już przedmiot
          const existingItemId = results[0].item_id;
          const updateQuery = `
            UPDATE players_items
            SET item_slot = ?
            WHERE player_id = ? AND item_id IN (?, ?)
          `;
          db.query(updateQuery, [newPosition, userId, itemId, existingItemId], (error, results) => {
            if (error) {
              console.error('Błąd podczas aktualizacji pozycji przedmiotów:', error);
              throw error;
            } else {
              console.log(`Pozycje przedmiotów zostały zamienione miejscami.`);
            }
          });
        } else {
          // Aktualizuj pozycję przesuwanego przedmiotu
          const updateQuery = `
            UPDATE players_items
            SET item_slot = ?
            WHERE player_id = ? AND item_id = ?
          `;
          db.query(updateQuery, [newPosition, userId, itemId], (error, results) => {
            if (error) {
              console.error('Błąd podczas aktualizacji pozycji przedmiotu:', error);
              throw error;
            } else {
              console.log(`Pozycja przedmiotu o ID ${itemId} została zaktualizowana.`);
            }
          });
        }
      }
    });
  } catch (error) {
    throw error;
  }
}





module.exports = router;
