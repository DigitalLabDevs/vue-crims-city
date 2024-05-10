<template>
  <div class="login-form">
    <router-link to="/">{{ t('global.backToMain') }}</router-link>
    <br>
    <label for="login">{{ t('login.login') }}</label>
    <input v-model="login" type="text" :placeholder="t('login.login')" />
    <label for="login">{{ t('login.password') }}</label>
    <input v-model="password" type="password" :placeholder="t('login.password')" />
    <button @click="loginUser">{{ t('login.loginButton') }}</button>
    <router-link to="/forgot-password">{{ t('login.forgotPasswordLink') }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Refy dla danych logowania oraz flaga isLoggedIn
const login = ref('');
const password = ref('');
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
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
}
input, button {
  width: 100%;
  margin-bottom: 10px;
}
button {

}
</style>
