<template>
  <div class="logout-form">
    <span class="btn-span" @click="confirmLogout">{{ t('logout.logoutButton') }}</span>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p class="w1">{{ t('logout.confirmMessage') }}</p>
        <button class="btn-yes" @click="logout">{{ t('logout.confirmButton') }}</button>
        <button class="btn-no" @click="cancelLogout">{{ t('logout.cancelButton') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import store from './StoreVuex';
import { API_URL } from '../../config';

const isAuthenticated = ref(store.getters.isAuthenticated);
console.log(isAuthenticated.value);

const { t } = useI18n();
const router = useRouter();

const showModal = ref(false);

const confirmLogout = () => {
  showModal.value = true;
};

const cancelLogout = () => {
  showModal.value = false;
};

const logout = () => {
    logoutFunc();
    showModal.value = false;
};

async function logoutFunc() {
  console.log("LOGOUT START");
  try {
    // Wywołanie endpointu /api/logout
    const response = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Sprawdzenie, czy odpowiedź jest udana
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Błąd podczas wylogowywania: ${errorMessage}`);
    }else{
      store.commit('clearSessionToken');
      // Przekierowanie użytkownika na stronę główną
      router.push('/');
    }
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    // Obsługa błędu, np. wyświetlenie komunikatu dla użytkownika
  }
}
</script>

<style scoped>
.btn-logout{
  cursor: pointer;
}
.btn-yes{
  background-color: rgb(187, 131, 26);
}

.btn-no{
  background-color: rgb(27, 192, 137);
}

p{
  color: aqua;
}
.logout-form {
  max-width: 300px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: rgb(56, 137, 155);
  padding: 20px;
  border-radius: 5px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
