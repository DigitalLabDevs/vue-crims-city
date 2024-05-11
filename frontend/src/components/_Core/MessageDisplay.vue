<template>
  <div v-if="shouldShowMessage" :class="messageClass">{{ message }}</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { eventBus } from './EventBus';

const message = ref('');
const status = ref(false);

onMounted(() => {
  eventBus.on('serverMessage', ({ message, status }) => {
    showMessage(message, status);
  });
});

const showMessage = (msg, stat) => {
  message.value = msg;
  status.value = stat;
};

const shouldShowMessage = ref(false);

const messageClass = computed(() => {
  return status.value ? 'success' : 'error';
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
