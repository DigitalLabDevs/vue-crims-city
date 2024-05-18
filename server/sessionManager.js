// sessionManager.js
require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db');

// Opcje sesji
const sessionOptions = {
  checkExpirationInterval: 900000, // Czas w milisekundach między sprawdzeniami wygasłych sesji
  expiration: 86400000, // Czas wygaśnięcia sesji w milisekundach
  schema: {
    tableName: 'sessions_store', // Nazwa tabeli
    columnNames: {
      session_id: 'session_id', // Nazwa kolumny identyfikatora sesji
      expires: 'expires', // Nazwa kolumny daty wygaśnięcia
      data: 'data' // Nazwa kolumny danych sesji
    }
  }
};

// Tworzenie instancji MySQLStore z opcjami
const sessionStore = new MySQLStore(sessionOptions, db, (error) =>{
  if(error) {
    console.log(`SESSION_ERROR: ${error}`);
  }
});

// Middleware session
const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  rolling: false, // Włączenie automatycznego odświeżania sesji
  name: process.env.SESSION_NAME, // Nazwa sesji
  cookie: {
    maxAge: parseInt(process.env.C_MAX_AGE), // Czas trwania sesji (w milisekundach)
    secure: false, // Ustaw na true, jeśli używasz HTTPS
    httpOnly: false, // Ustawienie httpOnly na false
  }
});

function sessionManager(app) {
  app.use(sessionMiddleware);
}



module.exports = sessionManager;
