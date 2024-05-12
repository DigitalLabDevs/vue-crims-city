<template>
  <div v-if="shouldShowErrorMessage" :class="errorMessageClass">{{ errorMessage }}</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const errorMessage = ref('');
const success = ref('');
const hasResponse = ref(false); 

const handleRegistrationError = ({ message, success: isSuccess }) => {
  errorMessage.value = message;
  success.value = isSuccess;
  hasResponse.value = true; 
};

const shouldShowErrorMessage = computed(() => {
  return errorMessage.value !== '' && hasResponse.value;
});

const errorMessageClass = computed(() => {
  return success.value ? 'success' : 'error';
});
</script>

<style scoped>
.error {
  background-color: rgba(226, 7, 7, 0.1);
  font-size: 16px;
  padding: 10px;
  color: rgb(255, 47, 47);
}

.success {
  background-color: rgba(7, 226, 7, 0.1);
  font-size: 16px;
  padding: 10px;
  color: greenyellow;
}
</style>
