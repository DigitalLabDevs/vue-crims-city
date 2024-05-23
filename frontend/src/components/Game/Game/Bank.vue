<template>
  <div class="bank">
    <h2>{{ t('bank.title') }}</h2>
    <div class="balance">{{ t('bank.balance') }}: {{ formattedBalance }}</div>
    <div class="actions">
      <button @click="deposit">{{ t('bank.deposit') }}</button>
      <button @click="withdraw">{{ t('bank.withdraw') }}</button>
    </div>
    <div class="transaction-history">
      <h3>{{ t('bank.transactionHistory') }}</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          <span>{{ transaction.type }}</span>
          <span>{{ transaction.amount }}</span>
          <span>{{ transaction.date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const balance = ref(1000); // Początkowe saldo
const transactions = ref([]); // Historia transakcji

// Oblicz formatowane saldo
const formattedBalance = computed(() => {
  return `$${balance.value.toFixed(2)}`;
});

// Funkcja do dokonywania wpłat
const deposit = () => {
  const amount = prompt(t('bank.enterAmount'));
  if (amount) {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      balance.value += parsedAmount;
      addTransaction('Deposit', parsedAmount);
    } else {
      alert(t('bank.invalidAmount'));
    }
  }
};

// Funkcja do dokonywania wypłat
const withdraw = () => {
  const amount = prompt(t('bank.enterAmount'));
  if (amount) {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= balance.value) {
      balance.value -= parsedAmount;
      addTransaction('Withdrawal', -parsedAmount);
    } else {
      alert(t('bank.invalidAmount'));
    }
  }
};

// Funkcja do dodawania transakcji do historii
const addTransaction = (type: string, amount: number) => {
  const transaction = {
    id: Date.now(), // Unikalny identyfikator transakcji
    type,
    amount,
    date: new Date().toLocaleString() // Data i godzina transakcji w lokalnym formacie
  };
  transactions.value.unshift(transaction); // Dodaj na początek historii
};
</script>

<style scoped>
.bank {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
}

.balance {
  font-weight: bold;
  margin-bottom: 10px;
}

.actions button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.transaction-history {
  margin-top: 20px;
}

.transaction-history ul {
  list-style-type: none;
  padding: 0;
}

.transaction-history li {
  margin-bottom: 5px;
}

.transaction-history li span {
  margin-right: 10px;
}
</style>
