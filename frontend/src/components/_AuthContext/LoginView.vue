<template>

  <div class="login-form">
    <form action="#" method="post">
      <router-link to="/">{{ t('global.backToMain') }}</router-link>
      <br>
      <label for="login">{{ t('login.login') }}</label>
      <input v-model="login" type="text" id="login" :placeholder="t('login.login')" autocomplete="email"/>
      <label for="password">{{ t('login.password') }}</label>
      <input v-model="password" type="password" id="password" :placeholder="t('login.password')" autocomplete="current-password"/>
      <button @click="loginUser">{{ t('login.loginButton') }}</button>
      <router-link to="/forgot-password">{{ t('login.forgotPasswordLink') }}</router-link>
    </form>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const login = ref('');
const password = ref('');
const isLoggedIn = ref(false);

const loginUser = () => {
  if (login.value === 'abc' && password.value === 'abc') {
    isLoggedIn.value = true;
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

input,
button {
  width: 100%;
  margin-bottom: 10px;
}

button {}
</style>
