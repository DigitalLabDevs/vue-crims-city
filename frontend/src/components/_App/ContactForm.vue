<template>
  <div class="w1 contact">
    <router-link to="/">{{ t('global.backToMain') }}</router-link>
    <form @submit.prevent="handleSubmit">
      <div>
        <div class="selectSpan">
          <label for="email">{{ t('global.emailLabel') }}</label>
          <input type="email" id="email" v-model="email" @input="validateEmail"
            :class="{ invalid: !isEmailValid && email.length > 0 }">
          <span v-if="!isEmailValid && submitted" class="error-message">
            {{ t('contact.InvalidemailAddress') }}
          </span>
        </div>
      </div>
      <div>
        <div class="selectSpan">
        <label for="subject">{{ t('contact.subject') }}</label>
          <select id="subject" v-model="subject">
            <option value="">{{ t('contact.selectOption') }}</option>
            <option v-for="option in subjectOptions" :key="option" :value="option">
              {{ t(`contact.${option}`) }}
            </option>
          </select>
          <span v-if="!subject && submitted" class="error-message">
            {{ t('contact.PleaseSelectASubject') }}
          </span>
        </div>
      </div>
      <div>
        <div class="selectSpan">
          <label for="message">{{ t('contact.message') }}</label>
          <textarea id="message" v-model="message" @input="updateCharacterCount"
            :maxlength="maxMessageLength"></textarea>
          <span v-if="!characterCount && submitted" class="error-message">
            {{ t('contact.PleaseEnterAMessage') }}
          </span>
        </div>
      </div>
      <Captcha ref="captcha" :onCaptchaValid="handleCaptcha" />
      <span v-if="!isCaptchaValid && submitted" class="error-message">
            {{ t('captcha.invalidCaptcha') }}
      </span>
      <div>{{ characterCount }}/{{ maxMessageLength }}</div>
      <button type="submit">{{ t('global.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Captcha from '../_Core/Captcha.vue';
import { getConfig } from 'config';

const config = getConfig();


const { t } = useI18n();

const email = ref('');
const subject = ref('');
const message = ref('');
const characterCount = ref(0);
const maxMessageLength = 2000;
const isCaptchaValid = ref(false);
const submitted = ref(false); 
const isEmailValid = ref(false);
const emit = defineEmits(['registrationError']);
const captcha = ref();

const subjectOptions = [
  'general_inquiry',
  'technical_support',
  'feedback',
  'sponsors',
  'other',
];

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailPattern.test(email.value);
};

const updateCharacterCount = () => {
  characterCount.value = message.value.length;
};

const validateForm = () => {
  return isEmailValid.value && 
    isCaptchaValid.value && 
    characterCount.value > 0 && 
    subject.value.trim() !== '';
};

function handleCaptcha(isValid: boolean) {
  isCaptchaValid.value = isValid;
}

const handleSubmit = async () => {
  submitted.value = true;

  if (!validateForm()) {
    return;
  }

  const formData = {
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  try {
    const response = await fetch(`${config.API_URL}/api/contact`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers,
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); 
    emit('registrationError', { messages: data.messages, code: data.code, success: data.success });
    email.value = '';
    subject.value = '';
    message.value = '';
    submitted.value = false;
    captcha.value.refreshCaptcha();
    characterCount.value = 0;
  } catch (error) {
    console.error('There was a problem with the fetch operation:');
  }
};
</script>

<style scoped>
.selectSpan {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  width: 30%;
}

input,
textarea,
select {
  min-width: 70%;
}

textarea {
  min-height: 120px;
  max-height: 280px;
}

form>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.contact {
  width: 80%;
}

.invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.9em;
}

</style>
