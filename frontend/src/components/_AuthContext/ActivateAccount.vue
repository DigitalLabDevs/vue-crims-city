<template>
  <div>
    <p>{{ activationStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { API_URL } from '../../config';


const { t } = useI18n()
const router = useRouter();
const emit = defineEmits(['registrationError']);
const props = defineProps<{
  token: string;
  success: string;
}>(); // Odbierz token z trasy jako props

const activationStatus = ref(""); // Status aktywacji 


onMounted(() => {
  if (props.token) {
    activateAccount(props.token);
  } else {
    if (props.success !== undefined) {
      if (props.success === 'true') {
        
     
        activationStatus.value = t('serverMessage.ACCOUNT_ACTIVATE');
        emit('registrationError', {code: 'ACCOUNT_ACTIVATE' , messages: 'success', success: true });
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else if (props.success === 'false') {

        activationStatus.value = t('serverMessage.ACCOUNT_ACTIVATE_DONE');
        emit('registrationError', {code: 'ACCOUNT_ACTIVATE_DONE_MESSAGE' , messages: 'info', success: true });
        
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        // activationStatus.value = 'Błąd Y, nie kombinuj';
        activationStatus.value = 'Niepoprawna wartość parametru success w URL.';
      }
    } else {
      activationStatus.value = 'Brak tokena aktywacyjnego lub parametru success w URL.'
    }
  }
});



async function activateAccount(token: string) {
  try {
    // Wyślij żądanie do serwera w celu aktywacji konta na podstawie otrzymanego tokenu
    const response = await fetch(`${API_URL}/activation/${token}`);
    // const data = await response.json(); // Odczytaj dane z odpowiedzi
    if (response.ok) {
      console.log('Konto zostało pomyślnie aktywowane.');

    } else {
      // Obsłuż błąd aktywacji konta
      console.error('Wystąpił błąd podczas aktywacji konta.');
      activationStatus.value = 'Wystąpił błąd podczas aktywacji konta.';
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
