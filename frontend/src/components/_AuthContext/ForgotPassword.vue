<template>
  <div class="ForgotPassword-form">
    <router-link to="/login">{{ t('login.backToLogin') }}</router-link>
    <h2>{{ t('forgotPassword.title') }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">{{ t('forgotPassword.emailLabel') }}</label>
        <input type="email" id="email" :placeholder="t('global.emailLabel')" autocomplete="email"  v-model="email" @input="validateForm" required>
      </div>
      <div class="form-group captcha">
        <label for="captcha">{{ t('captcha.captchaLabel') }}</label>
        <input type="text" id="captcha" :placeholder="t('captcha.captchaLabel')" v-model="captchaInput" @input="validateForm" required>
        <div class="chapta-flex">
          <img class="chapta-img" :src="captchaSrc" alt="captcha" @click="refreshCaptcha">
          <button type="button" class="w30p" @click="refreshCaptcha">{{ t('captcha.refreshCaptcha') }}</button>
      </div>
      </div>
      <button type="submit" class="w30p" :disabled="!isValid">{{ t('global.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Dane do wygenerowania captcha
const captchaData = generateCaptcha()
const captchaSrc = ref(captchaData.src)
let captchaText = captchaData.text
const captchaInput = ref('')
const email = ref('')
const { t } = useI18n()

// Sprawdzanie poprawności adresu e-mail
function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

// Logika odświeżania captcha
function refreshCaptcha() {
  const newCaptchaData = generateCaptcha()
  captchaSrc.value = newCaptchaData.src
  captchaText = newCaptchaData.text
  captchaInput.value = ''
}

// Logika wysyłania formularza
function submitForm() {
  if (captchaInput.value === captchaText) {
    // Wysyłanie formularza, np. do serwera
    console.log('Formularz wysłany:', { email: email.value })
  } else {
    alert(t('forgotPassword.invalidCaptcha'))
    refreshCaptcha()
  }
}

// Funkcja do generowania captcha
function generateCaptcha() {
  const captchaText = Math.random().toString(36).slice(2, 8)
  const captchaSrc = `https://dummyimage.com/150x50/000/fff&text=${captchaText}`
  return { text: captchaText, src: captchaSrc }
}

// Sprawdzenie poprawności formularza
const isValid = computed(() => {
  return validateEmail(email.value) && captchaInput.value === captchaText
})

// Wywołanie sprawdzania poprawności po wprowadzeniu danych
function validateForm() {
  isValid.value
}
</script>

<style scoped>
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
