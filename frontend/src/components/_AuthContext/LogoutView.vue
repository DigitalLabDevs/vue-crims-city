<template>
  <div class="logout-form">
    <span class="btn-span" @click="confirmLogout">{{ t('logout.logoutButton') }}</span>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p class="w2">{{ t('logout.confirmMessage') }}</p>
        <div class="dBtn">
          <button class="btn-yes" @click="logout">{{ t('logout.confirmButton') }}</button>
          <button class="btn-no" @click="cancelLogout">{{ t('logout.cancelButton') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import store from './StoreVuex';
import { API_URL } from '../../config';

const isAuthenticated = ref(store.getters.isAuthenticated);
console.log(`LOGOUT(isAuthenticated): ${isAuthenticated.value}`);

const { t } = useI18n();
const router = useRouter();

const showModal = ref(false);
console.log(`LOGOUT(showModal): ${showModal.value}`);

const confirmLogout = () => {
  showModal.value = true;
  console.log(`LOGOUT: YES`);
  console.log(`LOGOUT(showModal2): ${showModal.value}`);
};

const cancelLogout = () => {
  showModal.value = false;
  console.log(`LOGOUT: NO`);
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
    } else {
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
.dBtn{
  display: flex;
  justify-content: space-around;
}
/* Przyciski wylogowywania */
.btn-yes:hover,
.btn-no:hover {
  color: var(--black);
  background-color: var(--colorSky)
}

.btn-no,
.btn-yes {
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* Płynne przejścia */
}

.modal button {
  margin: 0px 3px 0px 3px;
}

/* Formularz wylogowywania */
.logout-form {
  max-width: 300px;
}

.w2 {
  color: var(--colorSky);
  font-size: 1rem;
  padding: 10px;
}

/* Okno modalne */
.modal {
  z-index: 9999;
  /* Na wierzchu */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Przezroczyste tło */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Zawartość okna modalnego */
.modal-content {
  background-color: #34495e;
  /* Ciemny szary */
  padding: 20px;
  border-radius: 5px;
}
</style>
