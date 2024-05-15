import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';


import enTranslations from './components/Language/translationsEN.json';
import plTranslations from './components/Language/translationsPL.json';

import './assets/main.css';

import App from './App.vue';
import router from './components/_Router/router';
import store from './components/_AuthContext/StoreVuex';

const messages = {
    en: enTranslations,
    pl: plTranslations
  };

const i18n = createI18n({
    legacy: false,
    locale: 'pl',
    fallbackLocale: 'en',
    messages,
  });

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(store);
app.mount('#app');
