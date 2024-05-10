<template>
  <div>
    <!-- Kalendarz -->
    <section class="calendar">
  <h2>Kalendarz Nowości</h2>
  <div>
    <input type="date" v-model="selectedDate" :max="new Date().toISOString().split('T')[0]" @change="fetchNews"/>
  </div>
</section>



    <h1>Nowości w mieście</h1>

    <!-- Opis gracza -->
    <section class="player-description">
      <h2>Ważne ostrzeżenie</h2>
      <p>Został złapany na gorącym uczynku gracz Vikary17, który w dniu 03.05.2024 próbował dokonać skoku.</p>
    </section>



    <!-- Wiadomości -->
    <section class="news-section">
      <h2>Wydarzenia dnia: {{ selectedDate }}</h2>
      <div class="news-item" v-for="newsItem in newsItems" :key="newsItem.id">
        <h3>{{ newsItem.title }}</h3>
        <p>{{ newsItem.content }}</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedDate = ref(new Date().toISOString().slice(0, 10)); // Dzisiejsza data jako domyślna
const newsItems = ref([]);

// Pobierz wiadomości na podstawie wybranej daty
const fetchNews = () => {
  // Symulacja pobierania danych z serwera
  // Tutaj możesz użyć odpowiednich zapytań API do pobrania wiadomości z wybranej daty
  // W tym przykładzie użyjemy przykładowych danych
  const exampleNews = [
    { id: 1, title: 'Spotkanie sojuszowe', content: 'Wszyscy członkowie sojuszu "Galaktyczne Imperium" proszeni są o udział w spotkaniu w dniu 05.05.2024 o godzinie 20:00. Zapraszamy!' },
    { id: 2, title: 'Nowy prezydent miasta', content: 'Po dzisiejszych wyborach nowym prezydentem miasta został wybrany gracz DarkKnight. Gratulujemy!' }
  ];
  newsItems.value = exampleNews; // Aktualizacja wiadomości
};

// Początkowe pobranie wiadomości
fetchNews();
</script>

<style scoped>

input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  
  padding: 8px;
  
  font-family: Arial, sans-serif;
  font-size: 14px;
}


input[type="date"]:focus {
  
  border-color: #007bff; 
}


/* input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
} */



/* .calendar{
  display: flex;
  align-items: center;
} */
.player-description {
  margin-bottom: 20px;
}

.calendar {
  margin-bottom: 20px;
}

.news-section {
  margin-bottom: 20px;
}

.news-item {
  margin-bottom: 10px;
}

h1,
h2,
h3 {
  color: #dadada;
}

p {
  color: #b6b6b6;
}
</style>
