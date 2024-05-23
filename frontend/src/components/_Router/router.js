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

import ContactForm from '../_App/ContactForm.vue';
import Settings from '../Game/Tools/Settings.vue';
import Main from '../Game/Game/Main.vue';
import Dashboard from '../Game/Game/Dashboard.vue';
import Buildings from '../Game/Game/Buildings.vue';
import BuildingDetails from '../Game/Core/BuildingDetails.vue';
import Trade from '../Game/Game/Trade.vue';
import Equipment from '../Game/Game/Equipment.vue';
import Shops from '../Game/Game/Shops.vue';
import Heists from '../Game/Game/Heists.vue';
import Arena from '../Game/Game/Arena.vue';
import Missions from '../Game/Game/Missions.vue';
import Bank from '../Game/Game/Bank.vue';
import Market from '../Game/Game/Market.vue';
import Hospital from '../Game/Game/Hospital.vue';
import Police from '../Game/Game/Police.vue';
import Messages from '../Game/Game/Messages.vue';
import PostOffice from '../Game/Game/PostOffice.vue';
import Statistics from '../Game/Game/Statistics.vue';

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
      redirect: '/crims-city/dashboard',
      components:{
        main: GameMain
      },
      children:[
        {
          path: 'dashboard',
          components: {
            game: Dashboard // Domyślny komponent dla /crims-city
          }
        },
        {
          path: 'maingame',
          components: {
            game: Main 
          },
        },
        {
          path: 'buildings',
          components: {
            game: Buildings 
          },
        },
        {
          path: 'buildings/:imageName', // Nowa trasa z parametrem imageName
          components: {
            game: Buildings,
            menu2: BuildingDetails 
          },
        },
        {
          path: 'trade',
          components: {
            game: Trade 
          },
        },
        {
          path: 'equipment',
          components: {
            game: Equipment 
          },
        },
        {
          path: 'shops',
          components: {
            game: Shops 
          },
        },
        {
          path: 'heists',
          components: {
            game: Heists,
            menu2: Equipment
          },
        },
        {
          path: 'arena',
          components: {
            game: Arena 
          },
        },
        {
          path: 'missions',
          components: {
            game: Missions 
          },
        },
        {
          path: 'bank',
          components: {
            game: Bank 
          },
        },
        {
          path: 'market',
          components: {
            game: Market
          },
        },
        {
          path: 'hospital',
          components: {
            game: Hospital
          },
        },
        {
          path: 'police',
          components: {
            game: Police
          },
        },
        {
          path: 'messages',
          components: {
            game: Messages
          },
        },
        {
          path: 'postoffice',
          components: {
            game: PostOffice
          },
        },
        {
          path: 'statistics',
          components: {
            game: Statistics
          },
        },
        {
          path: 'settings',
          components: {
            game: Settings 
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
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jeśli użytkownik próbuje uzyskać dostęp do chronionej ścieżki i nie jest zalogowany, przekierowujemy go na stronę logowania
    next('/login');
    return;
  } 

  if (!to.meta.requiresAuth && isAuthenticated) {
    // Jeśli użytkownik jest zalogowany i próbuje uzyskać dostęp do ścieżek nie wymagających autoryzacji, przekieruj go na inną stronę
    next('/crims-city'); 
    return;
  } 

  // W przeciwnym razie pozwalamy mu przejść do wybranej ścieżki
  next();
});




export default router;
