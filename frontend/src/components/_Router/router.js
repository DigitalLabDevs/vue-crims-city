import { createRouter, createWebHistory } from 'vue-router';

import ViewGame from '../GameCenter/Menu/ViewGame.vue';
import Rubs from '../GameCenter/Menu/Rubs.vue';
import Maps from '../GameCenter/Menu/Maps.vue';
import Messages from '../MenuCenter/Messages.vue';
import Character from '../GameCenter/Menu/Character.vue';
import Settings from '../Settings/Settings.vue';

import Login from '../_AuthContext/LoginView.vue'
import MainView from '../_AuthContext/MainView.vue';
import RegisterView from '../_AuthContext/RegisterView.vue';
import ForgotPassword from '../_AuthContext/ForgotPassword.vue';

import ChangePassword from '../Settings/ChangePassword.vue';


// Sprawdzamy stan zalogowania
const isAuthenticated = () => {
  // Tutaj możesz zaimplementować kod do sprawdzenia stanu zalogowania, np. odczytując ciasteczko, zmienną w lokalnym magazynie, itp.
  const isLoggedIn = false; // Zmienić na true, jeśli użytkownik jest zalogowany
  console.log(isLoggedIn);
  return isLoggedIn;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Trasa do logowania
    {
      path: '/',
      name: 'Main',
      component: MainView,
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegisterView,
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    // Pozostałe trasy
    { 
      path: '/',
      redirect: isAuthenticated() ? '/ViewGame' : '/' // Przekierowujemy na widok gry lub logowanie, w zależności od stanu zalogowania
    },
    { 
      path: '/ViewGame', 
      name: 'main',
      component: ViewGame,
      meta: { requiresAuth: true } // Wymaga autoryzacji
    },
    { path: '/rubs', component: Rubs, meta: { requiresAuth: true } },
    { path: '/maps', component: Maps, meta: { requiresAuth: true } },
    { path: '/messages', component: Messages, meta: { requiresAuth: true } },
    { path: '/character', component: Character, meta: { requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  ],
});

// Globalna funkcja middleware sprawdzająca autoryzację użytkownika
router.beforeEach((to, from, next) => {
  // Sprawdzamy, czy ścieżka wymaga autoryzacji
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Jeśli użytkownik próbuje uzyskać dostęp do chronionej ścieżki i nie jest zalogowany, przekierowujemy go na stronę logowania
    next('/login');
  } else {
    // W przeciwnym razie pozwalamy mu przejść do wybranej ścieżki
    next();
  }
});

export default router;
