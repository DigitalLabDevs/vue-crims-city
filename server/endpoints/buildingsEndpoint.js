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
// Upgrade budynku
//=====================================================================================
// app.post('/game/buildings/upgrade', verifyJwtToken, async (req, res) => {
//   const imageName = req.params.imageName;
//   const userId = req.user.userEmail;

//   console.log(`imageName: ${imageName}`);
//   console.log(`userId: ${userId}`);

//   return;

//   try {
//     // Pobierz informacje o ulepszeniu dla danego budynku
//     const buildingUpgradeInfo = await BuildingUpgrade.findOne({ where: { imageName } });

//     if (!buildingUpgradeInfo) {
//       return res.status(404).json({ message: 'Building upgrade info not found' });
//     }

//     // Zwróć czas ulepszenia dla aktualnego poziomu budynku
//     res.json({ upgradeTime: buildingUpgradeInfo.upgradeTime });
//   } catch (error) {
//     console.error('Error upgrading building:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
//=====================================================================================
// Pobieranie danych po kliknięciu na dany budynek więcej informacji
//=====================================================================================
router.post('/game/buildings/:imageName', verifyJwtToken, async (req, res) => {
  const imageName = req.params.imageName;
  const userId = req.user.userEmail;

  console.log(`imageName: ${imageName}`);
  console.log(`userId: ${userId}`);
  try {
    const result = await getBuildingsPlayerWithName(userId, imageName);
   
    console.log(`F => :
    ${JSON.stringify(result, null, 2)}`);

    res.status(200).json(result);
  } catch (error) {
    console.error('Błąd podczas pobierania danych z tabeli buildings:', error);
    res.status(500).json({ message: 'Błąd serwera podczas pobierania danych budynków' });
  }
});

//=====================================================================================
// Pobieranie wstępnych danych o budynkach
//=====================================================================================
router.post('/game/buildings', verifyJwtToken, async (req, res) => {
  const userId = req.user.userEmail;

  // console.log(`/game/buildings - userEmail => ${userId}`);

  try {
    // Zapytanie do bazy danych, aby pobrać wszystkie budynki
    const buildings = await getAllBuildings(userId);

    // console.log(JSON.stringify(buildings));
    // console.log(`buildings: ${buildings}`);

    // Wysłanie danych w formacie JSON do frontendu
    res.status(200).json(buildings);
  } catch (error) {
    console.error('Błąd podczas pobierania danych z tabeli buildings:', error);
    res.status(500).json({ message: 'Błąd serwera podczas pobierania danych budynków' });
  }
});
//=====================================================================================
// Funkcja do pobierania wszystkich budynków z bazy danych wraz z poziomem użytkownika
//=====================================================================================
async function getAllBuildings(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    b.*, 
    pb.*
FROM 
    buildings b
LEFT JOIN 
    players_buildings pb ON b.buildings_ids = pb.pb_buildings_ids
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

//=====================================================================================
// Funkcja do pobierania danych o budynku dla użytkownika na podstawie jego identyfikatora i nazwy budynku
//=====================================================================================
async function getBuildingsPlayerWithName(userId, buildingName) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    pb.*,
    b.buildings_name,
    bu.*
FROM 
    players_buildings pb
LEFT JOIN
    buildings b ON pb.pb_buildings_ids = b.buildings_ids
LEFT JOIN
    buildings_upgrades bu ON pb.pb_level + 1 = bu.level AND b.buildings_ids = bu.building_id
WHERE 
    pb.pb_player_ids = ? AND
    b.buildings_name = ?;
    `;

    db.query(query, [userId, buildingName], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania danych z tabeli player_buildings:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
//=====================================================================================
// UPGRADE BUILDINGS
//=====================================================================================
async function getupgradeBuildingsInfo(userId, imageName) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        pb.*,
        b.buildings_name
      FROM 
        player_buildings pb
      LEFT JOIN
        buildings b ON pb.pb_buildings_ids = b.buildings_ids
      WHERE 
        pb.pb_player_ids = ? AND
        b.buildings_name = ? LIMIT 1;
    `;

    db.query(query, [userId, buildingName], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania danych z tabeli player_buildings:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = router;
