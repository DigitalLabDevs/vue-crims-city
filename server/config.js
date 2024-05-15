// config.js

const config = {
    SYSTEM: 'SYSTEM:',
    saltRounds: 10,
    jwtSecret: 'tajny_klucz',
  };
  
  if (process.env.NODE_ENV === 'production') {
    config.API_URL = 'https://crims-city.ct8.pl';
  } else {
    config.API_URL = 'http://localhost:5173';
  }
  
  module.exports = config;
  