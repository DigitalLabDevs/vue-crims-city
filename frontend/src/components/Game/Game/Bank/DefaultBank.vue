<template>
  <div class="bank-default">
    <h1>Witaj w naszym Banku!</h1>
    <p>
      Mamy dla Ciebie świetne wieści! Firma <a href="#" class="company-link">TechGrow</a> odnotowała znaczący wzrost na giełdzie. 
      Obecnie jest to doskonały moment na inwestycję. Nie przegap tej okazji!
    </p>
    <p>
      <a href="#" class="investment-link">Zobacz więcej</a> | 
      <a href="#" class="investment-link">Inwestuj teraz</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getConfig } from 'config';

</script>

<style scoped>
.bank-default {
  background-color: #000000;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bank-default h1 {
  font-size: 24px;
  color: #cacaca;
  margin-bottom: 10px;
}

.bank-default p {
  font-size: 16px;
  color: #b3b3b3;
  margin-bottom: 10px;
}

.company-link {
  color: #007BFF;
  text-decoration: none;
}

.company-link:hover {
  text-decoration: underline;
}

.investment-link {
  color: #28a745;
  text-decoration: none;
  margin-right: 10px;
}

.investment-link:hover {
  text-decoration: underline;
}
</style>
