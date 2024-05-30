<template>
  <hr>
  <div class="password-overlay">
    <div class="po0v1">
      <h2>{{ t('settings.changePassword') }}</h2>
      <form @submit.prevent="changePassword">
        <label for="currentPassword">{{ t('password.currentPassword') }}</label>
        <input type="password" id="currentPassword" autocomplete="current-password" v-model="currentPassword" >

        <label for="newPassword">{{ t('password.newPassword') }}</label>
        <input type="password" id="newPassword" autocomplete="new-password" v-model="newPassword">

        <label for="confirmNewPassword">{{ t('password.confirmNewPassword') }}</label>
        <input type="password" id="confirmNewPassword" autocomplete="new-password" v-model="confirmNewPassword">
        <!-- <Captcha /> -->

        <button class="btn-chP" type="submit">{{ t('global.submit') }}</button>
      </form>
    </div>
    <div class="po0v2">
      <p>minimum 6 znaków</p>
      <p>1 cyfra</p>
      <p>1 znak specialny</p>
      <p>1 duża litera</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
// import Captcha from '../_Core/Captcha.vue';

const { t } = useI18n();

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const changePassword = async () => {
  if (newPassword.value !== confirmNewPassword.value) {
    // Handle password mismatch
    return;
  }

  try {
    const response = await fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers here
      },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      }),
    });

    if (response.ok) {
      // Password changed successfully
    } else {
      // Handle server error
    }
  } catch (error) {
    // Handle network error
  }
};
</script>

<style scoped>
.password-overlay {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}

button:hover{
  background-color: rgba(0, 200, 111, 0.5);
}

form {
  display: flex;
  flex-direction: column;
}

form * {
  /* width: 50%; */
}

.btn-chP {
  margin-top: 10px;
}

.po0v2 {
  background-color: var(--RGBA-BLACK-50);
  padding: 10px;
}
</style>
