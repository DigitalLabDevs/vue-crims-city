<template>
  <div class="Game-Footer">
   Footer
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.Game-Footer{
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-evenly;
}
</style>
