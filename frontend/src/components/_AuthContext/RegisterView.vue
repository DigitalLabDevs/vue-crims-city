<template>
  <div class="Registration-form">
    <router-link to="/">{{ t('global.backToMain') }}</router-link>
    <h2>{{ t('registration.title') }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">{{ t('registration.emailLabel') }}</label>
        <input type="email" id="email" :placeholder="t('registration.emailLabel')"  v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">{{ t('registration.passwordLabel') }}</label>
        <input type="password" id="password" :placeholder="t('registration.passwordLabel')" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">{{ t('registration.confirmPasswordLabel') }}</label>
        <input type="password" id="confirmPassword" :placeholder="t('registration.confirmPasswordLabel')" v-model="confirmPassword" required>
      </div>
      <div class="form-group captcha">
        <label for="captcha">{{ t('captcha.captchaLabel') }}</label>
        <input type="text" id="captcha" :placeholder="t('captcha.captchaLabel')" v-model="captchaInput" required>

        <div class="chapta-flex">
          <img class="chapta-img" :src="captchaSrc" alt="captcha" @click="refreshCaptcha">
          <button class="refresh-button" type="button" @click="refreshCaptcha">{{ t('captcha.refreshCaptcha') }}</button>
        </div>
        
      </div>
      <button type="submit" :disabled="!isValid">{{ t('registration.registrationButton') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const captchaInput = ref('');

function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateForm() {
  return validateEmail(email.value) && password.value === confirmPassword.value && captchaInput.value === captchaText;
}

const isValid = computed(() => {
  return validateForm();
});

const captchaData = generateCaptcha()
const captchaSrc = ref(captchaData.src)
let captchaText = captchaData.text

function generateCaptcha() {
  const captchaText = Math.random().toString(36).slice(2, 8)
  const captchaSrc = `https://dummyimage.com/150x50/000/fff&text=${captchaText}`
  return { text: captchaText, src: captchaSrc }
}

function refreshCaptcha() {
  const newCaptchaData = generateCaptcha()
  captchaSrc.value = newCaptchaData.src
  captchaText = newCaptchaData.text
}
</script>

<style scoped>
.Registration-form {
  width: 70%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 7px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.chapta-flex {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}

.chapta-img {
  border-radius: 7px;
  border: 1px solid;
}

input[type="email"],
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.refresh-button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
