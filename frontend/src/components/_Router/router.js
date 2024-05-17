import { createRouter, createWebHistory } from 'vue-router';
import store from '../_AuthContext/StoreVuex';

import Cookies from 'js-cookie';

import GameMain from '../Game/GameMain.vue';


import MainView from '../_App/MainSite/MainView.vue';
import CookiesInfo from '../_App/CookiesInfo.vue';
import Login from '../_AuthContext/LoginView.vue';
import RegisterView from '../_AuthContext/RegisterView.vue';
import ForgotPassword from '../_AuthContext/ForgotPassword.vue';
import ActivateAccount from '../_AuthContext/ActivateAccount.vue';
import ResetPassword from '../_AuthContext/ResetPassword.vue';

import Test from '../_Test/Test.vue';
import ContactForm from '../_App/ContactForm.vue';
import Settings from '../Game/Tools/Settings.vue';
import Main from '../Game/Game/Main.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      components:{
        main: MainView
      },
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/cookie',
      name: 'Cookie',
      components:{
        main: CookiesInfo
      },
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/contact',
      name: 'Contact',
      components:{
        main: ContactForm
      },
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/login',
      name: 'Login',
      components:{
        main: Login
      },
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/registration',
      name: 'Registration',
      components:{
        main: RegisterView
      },
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      components:{
        main: ForgotPassword
      },
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/activation',
      name: 'Activation',
      components:{
        main: ActivateAccount
      },
      props: true, // Przekazanie parametrów z trasy do komponentu jako props
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/activation/:token',
      name: 'ActivationWithToken',
      components:{
        main: ActivateAccount
      },
      props: true, // Przekazanie parametrów z trasy do komponentu jako props
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      components:{
        main: ResetPassword
      },
      props: true, // Przekazanie parametrów z trasy do komponentu jako props
      meta: { requiresAuth: false } // Nie wymaga autoryzacji
    },
    { 
      path: '/crims-city', 
      name: 'Game',
      // component: GameMain,
      components:{
        main: GameMain
      },
      children:[
        {
          path: 'maingame',
          components: {
            game: Main // Nazwa komponentu jako wartość settingsView
          },
        },
        {
          path: 'settings',
          components: {
            game: Settings // Nazwa komponentu jako wartość settingsView
          },
          meta: { requiresAuth: true }
        }
      ],
      meta: { requiresAuth: true } // Wymaga autoryzacji
    },
  ],
});

// Globalna funkcja middleware sprawdzająca autoryzację użytkownika
router.beforeEach((to, from, next) => {
  // const sessionToken = Cookies.get('session_token');
  // store.commit('setSessionToken', sessionToken);
  const isAuthenticated = store.getters.isAuthenticated;
  // const sessionToken = Cookies.get('session_token');
  // const isAuthenticated = sessionToken !== undefined;
  
  console.log(`router-isAuthenticated: ${isAuthenticated}`);

  // if (sessionToken !== undefined) {
  //   const isAuthenticated = true;
  //   console.log('Ciasteczko istnieje:', sessionToken);
  // } else {
  //   const isAuthenticated = false;
  //   console.log(`${isAuthenticated} : Ciasteczko nie istnieje.`);
  // }
  

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jeśli użytkownik próbuje uzyskać dostęp do chronionej ścieżki i nie jest zalogowany, przekierowujemy go na stronę logowania
    next('/login');
    return; // Dodaj return po przekierowaniu
  } 

  if (!to.meta.requiresAuth && isAuthenticated) {
    // Jeśli użytkownik jest zalogowany i próbuje uzyskać dostęp do ścieżek nie wymagających autoryzacji, przekieruj go na inną stronę
    next('/crims-city'); 
    return; // Dodaj return po przekierowaniu
  } 

  // W przeciwnym razie pozwalamy mu przejść do wybranej ścieżki
  next();
});




export default router;
