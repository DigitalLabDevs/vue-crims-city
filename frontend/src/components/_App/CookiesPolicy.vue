<template>
  <div class="w1">
    <h2>Informacje o używanych ciasteczkach</h2>
    <p>Nasza aplikacja korzysta z następujących ciasteczek:</p>
    <ul>
      <li><strong>session_token:</strong> Służy do utrzymania sesji użytkownika.</li>
      <li><strong>access_token:</strong> Służy do uwierzytelniania i autoryzacji.</li>
      <!-- Dodaj więcej ciasteczek, jeśli są używane -->
    </ul>
    <p>
      Korzystamy z Twojego adresu e-mail, aby umożliwić logowanie do naszej aplikacji. 
      Adres e-mail jest używany do identyfikacji użytkownika i zapewnienia bezpieczeństwa. 
      Bezpieczeństwo Twoich danych jest dla nas priorytetem.
    </p>
    <p>
      Aby dowiedzieć się więcej o ciasteczkach i ich wykorzystaniu, zapoznaj się z naszą 
      <router-link to="/cookie-policy">polityką cookies</router-link>.
    </p>
  </div>
</template>

<script setup>
// W tym komponencie używamy <script setup>, który jest uproszczonym sposobem
// na pisanie logiki komponentów w Vue 3.
// W tym przypadku nie potrzebujemy importować żadnych danych ani funkcji.
</script>

<style scoped>
/* Stylowanie komponentu. Możesz dostosować wygląd według swoich potrzeb. */
h2 {
  color: #03e0f9;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 8px 0;
}

p {
  margin: 16px 0;
}

router-link {
  color: #42b983;
  text-decoration: none;
}
</style>
