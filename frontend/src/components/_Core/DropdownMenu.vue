<template>
  <div 
    class="dropdown ssk"
    @mouseenter="showMenu"
    @mouseleave="hideMenu"
    >
    <a>
      <span class="dropdown-button">Menu</span>
    </a>
    <div v-if="isOpen" class="dropdown-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

function showMenu() {
  isOpen.value = true;
}

function hideMenu() {
  isOpen.value = false;
}


</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #000000;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 9999;
  padding: 5px;
  border-radius: 4px;
}

.dropdown-content a, .dropdown-content button, .dropdown-content div {
  color: var(--black);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover, .dropdown-content button:hover, .dropdown-content div:hover {
  background-color: #f1f1f1;
}

.dropdown .dropdown-content {
  display: block;
}
</style>
