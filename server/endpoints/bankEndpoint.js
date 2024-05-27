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
// Deponowanie kasy gracz w banku z player_money -> bank
//=====================================================================================
router.post('/game/bank/deposit', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;
  const { amount } = req.body;

  try {
    const result = await PlayerMoneyToBank(userId);

    console.log(result);

    // Sprawdzenie, czy użytkownik ma wystarczającą ilość pieniędzy na koncie
    if (result.length === 1) {
      const playerMoney = result[0].p_money;
      const bankPlayerMoney = result[0].b_player_money;

      // Logika dalszej obróbki danych
      if (playerMoney > amount) {
        const newPlayerMoneyCalc = playerMoney - amount;
        const newBankPlayerMoneyCalc = bankPlayerMoney + amount;

        const newPlayerMoneyFunc = await updatePlayerMoney(userId, newPlayerMoneyCalc);

        const newBankPlayerMoneyFunc = await updateBankMoney(userId, newBankPlayerMoneyCalc);

        

        // console.log(`newPlayerMoneyFunc: ${newPlayerMoneyFunc}`);
        // console.log*(`newBankPlayerMoneyFunc: ${newBankPlayerMoneyFunc}`)

        // console.log(`Nowe saldo gracza: ${newPlayerMoneyCalc}`);
        // console.log(`Nowe saldo gracza w banku: ${newBankPlayerMoneyCalc}`);

        return res.status(200).json({
          newPlayerMoney: newPlayerMoneyCalc,
          newBankPlayerMoney: newBankPlayerMoneyCalc
        });
        

      } else {
        console.log('Brak wystarczających środków na koncie gracza.');
      }
    } else {
      console.log('Nie znaleziono danych dla danego użytkownika.');
    }

    return;

    
  } catch (error) {
    console.error('Błąd Bank:', error);
  }
});
//=====================================================================================
// Wypłata kasy z banku gracza do player_money
//=====================================================================================
router.post('/game/bank/withdraw', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;
  const { amount } = req.body;

  console.log(userId);
  console.log(amount);
  // return;
  try {
    const result = await PlayerMoneyToBank(userId);

    console.log(result);

    // Sprawdzenie, czy użytkownik ma wystarczającą ilość pieniędzy w banku
    if (result.length === 1) {
      const playerMoney = result[0].p_money;
      const bankPlayerMoney = result[0].b_player_money;

      // Logika dalszej obróbki danych
      if (bankPlayerMoney >= amount) {
        const newPlayerMoneyCalc = playerMoney + amount;
        const newBankPlayerMoneyCalc = bankPlayerMoney - amount;

        const newPlayerMoneyFunc = await updatePlayerMoney(userId, newPlayerMoneyCalc);

        const newBankPlayerMoneyFunc = await updateBankMoney(userId, newBankPlayerMoneyCalc);

        console.log(`newPlayerMoneyFunc: ${newPlayerMoneyFunc}`);
        console.log(`newBankPlayerMoneyFunc: ${newBankPlayerMoneyFunc}`);

        console.log(`Nowe saldo gracza: ${newPlayerMoneyCalc}`);
        console.log(`Nowe saldo gracza w banku: ${newBankPlayerMoneyCalc}`);

        return res.status(200).json({
          newPlayerMoney: newPlayerMoneyCalc,
          newBankPlayerMoney: newBankPlayerMoneyCalc
        });

      } else {
        console.log('Brak wystarczających środków w banku.');
      }
    } else {
      console.log('Nie znaleziono danych dla danego użytkownika.');
    }

    return;

  } catch (error) {
    console.error('Błąd Bank:', error);
  }
});
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
      players.p_money,
      bank.b_player_money
    FROM 
      players
    JOIN 
      bank
    ON 
      players.p_ids_user = bank.b_player_ids
    WHERE 
      players.p_ids_user = ?;
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

async function PlayerMoneyToBank(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      players.p_money,
      bank.b_player_money
    FROM 
      players
    JOIN 
      bank
    ON 
      players.p_ids_user = bank.b_player_ids
    WHERE 
      players.p_ids_user = ?;
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


async function updatePlayerMoney(userId, newPlayerMoney) {
  return new Promise((resolve, reject) => {
    const updateQuery = `
      UPDATE players
      SET p_money = ?
      WHERE p_ids_user = ?;
    `;

    db.query(updateQuery, [newPlayerMoney, userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas aktualizacji danych gracza:', error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

async function updateBankMoney(userId, newBankMoney) {
  return new Promise((resolve, reject) => {
    const updateQuery = `
      UPDATE bank
      SET b_player_money = ?
      WHERE b_player_ids = ?;
    `;

    db.query(updateQuery, [newBankMoney, userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas aktualizacji danych bankowych:', error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}



module.exports = router;
