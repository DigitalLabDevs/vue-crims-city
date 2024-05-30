<template>
  <hr>
  <div class="email-overlay">
    <div class="eo0v1">
      <h2>{{ t('settings.changeEmail') }}</h2>
      <form @submit.prevent="changeEmail">
        <label for="newEmail">{{ t('global.emailLabel') }}</label>
        <input type="email" id="newEmail" v-model="newEmail">

        <label for="currentPassword">{{ t('password.currentPassword') }}</label>
        <input type="password" id="currentPassword" autocomplete="current-password" v-model="currentPassword">

        <div v-if="send" class="code">
          <span>{{ t('changeEmail.info') }}</span>
          <div class="code-div">
            <label for="code">{{ t('password.code') }}</label>
            &nbsp;
            <input type="number" id="code" v-model="code">
          </div>
        </div>

        <button v-if="!send" class="btn-chE" type="submit">{{ t('global.submit') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
// import Captcha from '../_Core/Captcha.vue';

const { t } = useI18n();

const newEmail = ref('');
const currentPassword = ref('');
const code = ref('');
const send = ref(false);

const changeEmail = async () => {
  try {
    send.value = true;
    return;
    const response = await fetch('/api/change-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers here
      },
      body: JSON.stringify({
        newEmail: newEmail.value,
        currentPassword: currentPassword.value,
      }),
    });

    if (response.ok) {
      // Email changed successfully
    } else {
      // Handle server error
    }
  } catch (error) {
    // Handle network error
  }
};
</script>

<style scoped>
.code-div input{
  width: 100px;
}
span{
  position: absolute;
    left: -155px;
    top: -17px;
    width: 523px;
}
.code {
  margin-top: 18px;
  /* border: 1px solid red; */
  padding: 5px;
}

.email-overlay {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}

button:hover {
  background-color: rgba(0, 200, 111, 0.5);
}

form {
  display: flex;
  flex-direction: column;
}

form * {
  /* width: 50%; */
}

.btn-chE {
  margin-top: 10px;
}

.eo0v2 {
  background-color: var(--RGBA-BLACK-50);
  padding: 10px;
}
</style>
