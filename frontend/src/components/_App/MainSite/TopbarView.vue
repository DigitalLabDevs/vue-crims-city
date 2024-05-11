<template>
  <div class="lang-title">{{ t('global.chooseLanguage') }} </div>
  <div>
    <LanguageSelector />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import LanguageSelector from '../../Language/LanguageSelector.vue';
</script>

<style scoped>

.lang-title {
  width: 12%;
  text-align: center;
}

@media (max-width: 768px) {}

@media (max-width: 576px) {
  .lang-title {
    width: 35%;
  }
}
</style>