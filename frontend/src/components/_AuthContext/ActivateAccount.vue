<template>
  <div>
    <p>{{ activationStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import { API_URL } from '../../config';

const router = useRouter();

const props = defineProps<{
  token: string;
}>(); // Odbierz token z trasy jako props

const activationStatus = ref("Aktywowanie konta..."); // Status aktywacji konta

async function activateAccount(token: string) {
  try {
    // Wyślij żądanie do serwera w celu aktywacji konta na podstawie otrzymanego tokenu
    const response = await fetch(`${API_URL}/activation/${token}`);
    if (response.ok) {
      // Obsłuż sukces aktywacji konta
      console.log('Konto zostało pomyślnie aktywowane.');
      activationStatus.value = 'Aktywacja przebiegła pomyślnie. \n Za chwilę nastąpi przekierowanie do logowania...';
      // Przekierowanie do strony logowania po 3 sekundach
      setTimeout(() => {
        router.push('/login');
      }, 3500);
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

activateAccount(props.token); // Wywołaj funkcję aktywacji konta przy tworzeniu komponentu
</script>

<style scoped>
p{
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  padding: 7px;
}
</style>
