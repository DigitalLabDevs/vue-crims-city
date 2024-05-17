<template>
  <div class="w1 contact">
    <router-link to="/">{{ t('global.backToMain') }}</router-link>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">{{ t('global.emailLabel') }}</label>
        <input type="email" id="email" v-model="email" @input="validateEmail"
          :class="{ invalid: !isEmailValid && email.length > 0 }" />
        <span v-if="!isEmailValid && email.length > 0" class="error-message">Invalid email address</span>
      </div>
      <div>
        <label for="subject">{{ t('contact.subject') }}</label>
        <select id="subject" v-model="subject">
          <option v-for="option in subjectOptions" :key="option" :value="option">
            {{ t(`contact.${option}`) }}
          </option>
        </select>
      </div>
      <div>
        <label for="message">{{ t('contact.message') }}</label>
        <textarea id="message" v-model="message" @input="updateCharacterCount" :maxlength="maxMessageLength"></textarea>
      </div>
      <div>{{ characterCount }}/{{ maxMessageLength }}</div>
      <button type="submit">{{ t('global.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const email = ref('');
const subject = ref('');
const message = ref('');
const characterCount = ref(0);
const maxMessageLength = 2000;

const subjectOptions = [
  'general_inquiry',
  'technical_support',
  'feedback',
  'sponsors',
  'other',
];

const isEmailValid = ref(true);

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailPattern.test(email.value);
};

const updateCharacterCount = () => {
  characterCount.value = message.value.length;
};

const handleSubmit = async () => {
  if (!isEmailValid.value) {
    alert('Please enter a valid email address.');
    return;
  }

  if (characterCount.value === 0) {
    alert('Message cannot be empty.');
    return;
  }

  const formData = {
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    alert('Your message has been sent successfully!');
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    alert('There was an error sending your message. Please try again later.');
  }
};
</script>

<style scoped>
label{
  width: 30%;
}
input,
textarea,
select {
  min-width: 70%;
  max-width: 370px;
}
textarea{
  min-width: 70%;
  max-width: 70%;
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
