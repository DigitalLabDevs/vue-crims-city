<template>
    <div class="main-links">
      <router-link to="/login">{{ t('main.loginLabel') }}</router-link>
      <router-link to="/registration">{{ t('main.registerLabel') }}</router-link>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Refy dla danych logowania oraz flaga isLoggedIn
const login = ref('abc');
const password = ref('abc');
const isLoggedIn = ref(false);

// Funkcja logowania użytkownika
const loginUser = () => {
  // Symulacja logowania - sprawdzenie, czy login i hasło są poprawne
  if (login.value === 'abc' && password.value === 'abc') {
    isLoggedIn.value = true; // Ustawienie flagi na true po poprawnym zalogowaniu
    console.log('Logged in successfully!');
  } else {
    console.log('Invalid login credentials!');
  }
};
</script>

<style scoped>

.main-links {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.main-links>* {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 40px 10px 40px;
  box-shadow: 0 0 10px black;
  border: 1px solid rgba(26, 77, 94, 0.8);
  width: 30%;
  text-align: center;
}
.main-links>*:hover {
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(26, 77, 94, 0.9);
}
</style>
