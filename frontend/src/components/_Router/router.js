import { createRouter, createWebHistory } from 'vue-router';

import GameMain from '../Game/GameMain.vue';

import Login from '../_AuthContext/LoginView.vue'
import MainView from '../_AuthContext/MainView.vue';
import RegisterView from '../_AuthContext/RegisterView.vue';
import ForgotPassword from '../_AuthContext/ForgotPassword.vue';
import ActivateAccount from '../_AuthContext/ActivateAccount.vue';



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
    {
      path: '/activation',
      name: 'Activation',
      component: ActivateAccount,
      // props: false, // Przekazanie parametrów z trasy do komponentu jako props
      props: (route) => ({ success: route.query.success }),
    },
    {
      path: '/activation/:token',
      name: 'ActivationWithToken',
      component: ActivateAccount,
      props: true, // Przekazanie parametrów z trasy do komponentu jako props
      // props: (route) => ({ token: route.query.token }),
    },
    // Pozostałe trasy
    { 
      path: '/',
      redirect: isAuthenticated() ? '/crims-city' : '/' // Przekierowujemy na widok gry lub logowanie, w zależności od stanu zalogowania
    },
    { 
      path: '/crims-city', 
      name: 'main',
      component: GameMain,
      meta: { requiresAuth: true } // Wymaga autoryzacji
    },
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
