<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <button @click.stop="closeModal" class="close-btn">X</button>

        <div class="Language-Selector">
            <div>{{ $t("global.chooseLanguage") }}</div>
            <div>
                <LanguageSelector />
            </div>
        </div>

        <div>
            <Button>Zmień hasło</Button>
        </div>
        <div>
        <Button>Zmień emaila</Button>
        </div>



      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import LanguageSelector from '../Language/LanguageSelector.vue';
  
  const router = useRouter();
  
  const closeModal = () => {
    // Zamknij modal poprzez zmianę ścieżki na "/"
    router.push('/');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    position: relative;
    width: 800px;
    height: 600px;
    background-color: #171717;
    border: 1px solid rgb(47, 255, 0);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
  
  .close-btn:hover {
    color: #ff0000; /* Zmiana koloru na czerwony przy najechaniu myszką */
  }

  .Language-Selector {
    display: flex;
    align-items: center;
}
.Language-Selector > div{
    margin-left: 2px;
    margin-right: 2px;
}
  </style>
  ``
  