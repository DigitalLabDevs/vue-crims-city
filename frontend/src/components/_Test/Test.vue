<template>
  <div>
    <Captcha @onCaptchaValid="handleCaptchaValid" :onCaptchaValid="handleCaptcha" />
    <p v-if="isCaptchaCorrect">CAPTCHA has been validated successfully!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Captcha from '../_Core/Captcha.vue';

const isCaptchaCorrect = ref(false);

const handleCaptchaValid = (isValid) => {
  isCaptchaCorrect.value = isValid;
};
</script>

<style scoped>
/* Dodaj swoje style tutaj */
</style>
