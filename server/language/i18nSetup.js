// middleware.js

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'pl',
  objectNotation: true,
  register: global,
});

function setLocale(req, res, next) {
  const preferredLanguage = req.headers['accept-language'].split(',')[0];
  if (preferredLanguage) {
    const supportedLanguages = ['pl', 'en'];
    const locale = supportedLanguages.find(lang => preferredLanguage.includes(lang));
    if (locale) {
      i18n.setLocale(locale);
    }
  }
  next();
}

function consoleLogHeaders(req, res, next) {
  console.log(`=> req.headers: ${JSON.stringify(req.headers, null, 2)}`);
  
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    console.log(`=> Ciasteczko "session_token": ${cookies['session_token']}`);
    console.log(`=> Ciasteczko "access_token": ${cookies['access_token']}`);

    req.sessionToken = cookies['session_token'];
    req.accessToken = cookies['access_token'];
  } else {
    console.log('=> Brak ciasteczek w nagłówkach.');
  }

  next();
}

module.exports = { i18n, setLocale, consoleLogHeaders };
