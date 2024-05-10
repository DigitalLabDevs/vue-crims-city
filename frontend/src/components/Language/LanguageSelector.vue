<template>
    <div>
      <select v-model="selectedLanguage" @change="changeLanguage">
        <option v-for="(language, index) in supportedLanguages" :key="index" :value="language.code">
          {{ language.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  const supportedLanguages = ref([
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' }
  ]);
  
  const { t, locale } = useI18n();
  
  const selectedLanguage = ref(locale.value);
  
  const changeLanguage = () => {
    locale.value = selectedLanguage.value;
    saveLanguage();
  };
  
  const saveLanguage = () => {
    localStorage.setItem('selectedLanguage', selectedLanguage.value);
  };
  
  const loadLanguage = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && supportedLanguages.value.some(lang => lang.code === savedLanguage)) {
      selectedLanguage.value = savedLanguage;
      locale.value = savedLanguage;
    }
  };
  
  onMounted(() => {
    loadLanguage();
  });
  </script>
  
  <style scoped>
/* select {
  padding: 8px 12px; 
  font-size: 16px; 
  border: 1px solid #b4b4b4; 
  border-radius: 4px; 
  background-color: #5b5b5b; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  appearance: none; 
  outline: 0px;
}


select::after {
  content: '\25BC'; 
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none; 
} */
</style>