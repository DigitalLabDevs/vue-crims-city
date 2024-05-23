<template>
  <div class="ForgotPassword-form">
    <router-link to="/login">{{ t('login.backToLogin') }}</router-link>
    <h2>{{ t('forgotPassword.title') }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">{{ t('global.emailLabel') }}</label>
        <input type="email" id="email" :placeholder="t('global.emailLabel')" autocomplete="email"  v-model="email" @input="validateForm" required>
      </div>
      <div class="form-group captcha">
        <Captcha :onCaptchaValid="handleCaptcha"/>
      </div>
      <button type="submit" class="w30p" :disabled="!isValid">{{ t('global.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_URL } from '../../config.js';
import Captcha from '../_Core/Captcha.vue';

const { t } = useI18n();

// Dane do wygenerowania captcha
const email = ref('');
// const email = ref('hesidak940@bsomek.com');
const isCaptchaValid = ref(false);

// Sprawdzanie poprawności adresu e-mail
function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

function validateForm() {
  return validateEmail(email.value) && isCaptchaValid.value;
}

function handleCaptcha(isValid) {
  console.log('Props onCaptchaValid wysłany. Wartość:', isValid);
  isCaptchaValid.value = isValid;
}

// Sprawdzenie poprawności formularza
const isValid = computed(() => {
  return validateForm();
})




// Logika wysyłania formularza
function submitForm() {
  if (!isCaptchaValid.value) {
    console.log("FALSE: " + isCaptchaValid.value);
  } else {
    console.log("TRUE: " + isCaptchaValid.value);
    forgotPassword();
    email.value = '';
  }
}

const emit = defineEmits(['registrationError']);
async function forgotPassword() {
  try {
    const response = await fetch(`${API_URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    });
    const data = await response.json(); 
    console.log(`${JSON.stringify(data)}`);
    emit('registrationError', { messages: data.messages, code: data.code, success: data.success});
    
    if (!response.ok) {
      throw new Error('Błąd rejestracji');
    }
    
  } catch (error) {
    console.error('Błąd rejestracji:', error);
  }
}

</script>

<style scoped>
@media (max-width: 480px) {
  .ForgotPassword-form{
    width: 100%!important;
    padding: 7px!important;
  }
}


.chapta-flex{
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}
.chapta-img{
  border-radius: 7px;
  border: 1px solid;
}
.ForgotPassword-form {
  width: 70%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  /* margin: 0 auto; */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="text"] {
  width: 100%;
}

.captcha img {
  cursor: pointer;
}
</style>
