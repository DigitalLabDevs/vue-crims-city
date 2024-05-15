<template>
  <div class="password-reset">
    <h2>{{ $t('password_reset.title') }}</h2>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label>{{ $t('global.passwordLabel') }}:</label>
        <input type="password" autocomplete="new-password" v-model="password" required />
      </div>
      <div class="input-group">
        <label>{{ $t('global.confirmPasswordLabel') }}:</label>
        <input type="password" autocomplete="new-password" v-model="confirmPassword" required />
      </div>
      <button type="submit" :disabled="!isValid">{{ $t('global.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_URL } from '../../config.js';

const password = ref('Zaq1@wsx');
const confirmPassword = ref('Zaq1@wsx');
const route = useRoute();
const router = useRouter();

// const token = ref(route.query.token);

const token = route.query.token;
console.log(token);

function validatePassword(password: string): boolean {
  const validatePassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return validatePassword.test(password);
}

const validateForm = () => {
  return validatePassword(password.value) && password.value === confirmPassword.value && password.value !== '' && confirmPassword.value !== '';
};

const isValid = computed(() => {
  console.log(validateForm());
  return validateForm();
});

const submitForm = async () => {
  if (isValid.value) {
    try {
      await setNewPassword();
    } catch (error) {

    }
  }
};


const emit = defineEmits(['registrationError']);
async function setNewPassword() {
  console.log(`TOKEN: ${token}`);
  console.log(`NEW PASSWORD: ${password.value}`);
  try {
    const response = await fetch(`${API_URL}/api/set-new-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token, newPassword: password.value })
    });

    if (!response.ok) {
      const data = await response.json();
      emit('registrationError', { messages: data.messages, code: data.code, success: data.success });
      throw new Error('Błąd aktualizacji hasła');
    } else {
      // Rejestracja zakończona sukcesem, można przekierować użytkownika lub wyświetlić komunikat
      const data = await response.json();
      console.log(`${JSON.stringify(data)}`);
      emit('registrationError', { messages: data.messages, code: data.code, success: data.success }); 
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }

    
    
  } catch (error) {
    console.error('Błąd aktualizacji hasła:', error);
  }
}
</script>

<style scoped>
.password-reset {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 17px;
}

.input-group {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
