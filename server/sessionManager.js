// sessionManager.js

const session = require('express-session');
const { secret_key } = require('./config');

// Funkcja obsługująca sesję
function sessionManager(app) {
  return session({
    secret: secret_key,
    resave: false,
    saveUninitialized: true,
  });
}

module.exports = sessionManager;
