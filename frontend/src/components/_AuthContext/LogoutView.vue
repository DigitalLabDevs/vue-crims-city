<template>
  <div class="logout-form">
    <button @click="confirmLogout">{{ t('logout.logoutButton') }}</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ t('logout.confirmMessage') }}</p>
        <button @click="logout">{{ t('logout.confirmButton') }}</button>
        <button @click="cancelLogout">{{ t('logout.cancelButton') }}</button>
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
  // Usunięcie ciasteczka session_token
  Cookies.remove('session_token');
  store.commit('clearSessionToken');
  router.push('/login');

  showModal.value = false;
};
</script>

<style scoped>
.logout-form {
  max-width: 300px;
  margin: 0 auto;
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
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
