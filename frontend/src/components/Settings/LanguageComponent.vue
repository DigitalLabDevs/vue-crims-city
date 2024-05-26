<template>
  <hr>
    <div class="language-overlay">
      <h2>{{ t('settings.languageSettings') }}</h2>
     <LanguageSelector />
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n';
  import LanguageSelector from '../Language/LanguageSelector.vue';

  const { t } = useI18n();
  </script>
  
  <style scoped>
  </style>
  ``
  