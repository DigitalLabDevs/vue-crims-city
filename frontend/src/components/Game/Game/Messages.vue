<template>
  <div class="Messages">
    <h1>{{ t('game.messages') }}</h1>
    Messages
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
