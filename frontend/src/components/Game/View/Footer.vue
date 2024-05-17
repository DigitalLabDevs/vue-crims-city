<template>
  <div class="Game-Footer">
    <div class="fx">
      <span class="btn-span">Pomoc</span>
      <span class="btn-span">Forum</span>
      <span class="btn-span">Zasady gry</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.Game-Footer {
  display: flex;
  justify-content: space-evenly;
}
.fx>*{
  margin-left: 3px;
  margin-right: 3px;
}
</style>
