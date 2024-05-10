<template>
    <div class="Game-Topbar">
      <div class="Game-Logo">
        <router-link to="/">
          <img src="/game/logo.png" alt="Logo" />
        </router-link>
      </div>
      <div class="settings-link">
        <router-link to="/settings">{{ $t('menu.settings') }}</router-link>
      </div>
    </div>
  </template>
  
  <script setup>

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
  
  .settings-link {
    z-index: 11;
    display: flex;
    align-items: center;
  }
  
  .Game-Topbar {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    border: 1px solid green;
  }
  </style>
  