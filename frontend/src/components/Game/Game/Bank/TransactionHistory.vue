<template>
  <div class="transaction-history">
    <h2>{{ $t('bank.transactionHistory') }}</h2>
    <ul class="transaction-list">
      <li v-for="(transaction, index) in paginatedTransactions" :key="index" class="transaction-item">
        <span>{{ transaction.date | formatDate }}</span>
        <span>{{ transaction.type }}</span>
        <span>{{ transaction.amount }}</span>
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">{{ $t('pagination.prev') }}</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">{{ $t('pagination.next') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

// Funkcja formatująca datę
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Przykładowe transakcje
const sampleTransactions = [
  { date: '2024-05-30', type: 'deposit', amount: 100 },
  { date: '2024-05-29', type: 'withdrawal', amount: 50 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  { date: '2024-05-28', type: 'transfer', amount: 75 },
  // Tutaj dodać więcej przykładowych transakcji...
];

// Paginacja
const itemsPerPage = 10;
const currentPage = ref(1);

// Obliczenie całkowitej liczby stron
const totalPages = computed(() => Math.ceil(sampleTransactions.length / itemsPerPage));

// Obliczenie indeksu początkowego i końcowego dla aktualnej strony
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => currentPage.value * itemsPerPage);

// Pobranie transakcji dla aktualnej strony
const paginatedTransactions = computed(() => sampleTransactions.slice(startIndex.value, endIndex.value));

// Funkcje zmiany strony
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

// I18n
const { t } = useI18n();
</script>

<style scoped>
.transaction-history {
  /* max-width: 600px; */
  margin: auto;
}

.transaction-list {
  list-style: none;
  padding: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 5px;
  cursor: pointer;
}
</style>
