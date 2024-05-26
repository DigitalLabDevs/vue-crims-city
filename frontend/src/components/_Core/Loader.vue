<template>
  <div class="spinner-full">
  <div class="spinner"></div>
</div>
</template>

<script setup>
// Tutaj można dodać logikę JavaScript, jeśli jest potrzebna
</script>

<style scoped>
.spinner-full{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, .1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>