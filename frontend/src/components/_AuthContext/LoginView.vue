<template>

  <div class="login-form">
    <form @submit.prevent="submitForm">
      <router-link to="/">{{ t('global.backToMain') }}</router-link>
      <br>
      <label for="login">{{ t('global.emailLabel') }}</label>
      <input v-model="email" type="text" id="login" :placeholder="t('global.emailLabel')" autocomplete="email" />
      <label for="password">{{ t('global.passwordLabel') }}</label>
      <input v-model="password" type="password" id="password" :placeholder="t('global.passwordLabel')"
        autocomplete="current-password" />
      <button @click="loginUser">{{ t('login.loginButton') }}</button>
      <router-link to="/forgot-password">{{ t('login.forgotPasswordLink') }}</router-link>
    </form>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import store from './StoreVuex';
import { API_URL } from '../../config';
import Cookies from 'js-cookie';

const { t } = useI18n();
const router = useRouter();

const emit = defineEmits(['registrationError']);

// const email = ref('');
// const password = ref('');

const email = ref('yovasec567@fincainc.com');
const password = ref('Zaq1@wsx');

const submitForm = async () => {
  loginFunc();
};



async function loginFunc() {
  console.log("START");
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    if (!response.ok) {
      const data = await response.json();
      emit('registrationError', { messages: data.messages, code: data.code, success: data.success });
      throw new Error('Błąd logowania');
    } else {
      const data = await response.json();
      emit('registrationError', { messages: data.messages, code: data.code, success: data.success });
      if (data.isLoggedIn) {
        const sessionToken = Cookies.get('Oo!SK');
        store.commit('setSessionToken', sessionToken);
        router.push('/crims-city');
      }
    }
  } catch (error) {
    console.error('Błąd logowania:', error);
  }
}
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
