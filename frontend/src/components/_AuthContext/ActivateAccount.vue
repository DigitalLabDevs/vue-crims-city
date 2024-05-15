<template>
  <div>
    <p>{{ activationStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { API_URL } from '../../config';


const { t } = useI18n()
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['registrationError']);
const props = defineProps<{
  token?: string;
  success?: string;
}>();

const activationStatus = ref(''); // Status aktywacji 
// Odbieranie propsów z adresu URL
const token = route.query.token;
console.log(token);

onMounted(async () => {
  if (token) {
    const { success, message, code } = await activateAccount(token);
    if (success) {
      activationStatus.value = message || t('serverMessage.ACCOUNT_ACTIVATE');
      emit('registrationError', { code: code, messages: 'success', success: true });
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      // Obsłuż przypadki, gdy aktywacja konta nie powiodła się
      activationStatus.value = message || t('serverMessage.ACTIVATION_ERROR');
      // activationStatus.value = t('serverMessage.ACTIVATION_ERROR');
    }
  }
});



async function activateAccount(token: string) {
  try {
    // Wyślij żądanie do serwera w celu aktywacji konta na podstawie otrzymanego tokenu
    const response = await fetch(`${API_URL}/activation/${token}`);
    console.log(response);
    const data = await response.json(); // Odczytaj dane z odpowiedzi
    console.log(data);
    if (response.ok) {
      console.log('Konto zostało pomyślnie aktywowane.');
      return { success: data.success, message: data.message, code: data.code };
    } else {
      // Obsłuż błąd aktywacji konta
      console.error('Wystąpił błąd podczas aktywacji konta.');
      return { success: data.success, message: data.message, code: data.code };
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas aktywacji konta:', error);
    activationStatus.value = 'Wystąpił błąd podczas aktywacji konta.';
  }
}

</script>

<style scoped>
p {
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  padding: 7px;
}
</style>
