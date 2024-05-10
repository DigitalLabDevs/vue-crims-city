<template>
  <div>
    <h2>Gdzie napadasz dzisiaj?</h2>
    <button @click="robBank">Napadnij na bank</button>
    <button @click="robStore">Napadnij na sklep</button>
    <button @click="robHouse">Napadnij na dom</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const robBank = () => {
  // Logika napadu na bank
  console.log("Napadasz na bank!");
};

const robStore = () => {
  // Logika napadu na sklep
  console.log("Napadasz na sklep!");
};

const robHouse = () => {
  // Logika napadu na dom
  console.log("Napadasz na dom!");
};
</script>
