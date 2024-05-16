<template>
  <div class="captcha-container">
    <label for="captcha">{{ t('captcha.title') }}</label>
    <div class="captchaInput">
      <input v-model="userInput" @input="validateCaptcha" :placeholder="t('captcha.placeholder')" required />
    </div>
    <div class="captchaView">
      <canvas ref="captchaCanvas" :width="captchaWidth" :height="captchaHeight"></canvas>
      <button @click.prevent="refreshCaptcha">{{ t('captcha.refreshCaptcha') }}</button>
    </div>

    <!-- <p v-if="isCaptchaValid">CAPTCHA is correct!</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  onCaptchaValid: Boolean
});

const captchaText = ref('');
const userInput = ref('');
const isCaptchaValid = ref(false);
const captchaLength = ref(6);
const captchaWidth = ref(150);
const captchaHeight = ref(50);

const generateCaptcha = () => {
  const canvas = document.querySelector('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
      let text = '';

      for (let i = 0; i < captchaLength.value; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length));
      }



      captchaText.value = text;
      // userInput.value = text;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, captchaWidth.value, captchaHeight.value);
      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';

      let x = 10;
      for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], x, 35 + Math.random() * 10);
        x += 20 + Math.random() * 5;
      }
    }
  }
};

const validateCaptcha = () => {
  if (userInput.value === captchaText.value) {
    isCaptchaValid.value = true;
    if (props.onCaptchaValid) {
      props.onCaptchaValid(true);
    }
  } else {
    isCaptchaValid.value = false;
    if (props.onCaptchaValid) {
      props.onCaptchaValid(false);
    }
  }
};

const refreshCaptcha = () => {
  generateCaptcha();
  userInput.value = '';
};

onMounted(() => {
  generateCaptcha();
});

defineExpose({ isCaptchaValid });
</script>

<style scoped>
label{
  margin-bottom: 5px;
}
.captchaView {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.captcha-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

canvas {
  border: 1px solid rgb(13, 150, 196);
  border-radius: 5px;
}

.captchaInput,
input {
  width: 100%;
}
.captchaInput {
  margin-bottom: 5px;
}

p {
  color: green;
  margin-top: 10px;
}
</style>
