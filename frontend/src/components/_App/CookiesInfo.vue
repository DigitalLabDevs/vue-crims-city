<template>
  <div class="w1 epc">
    <router-link to="/">{{ t('global.backToMain') }}</router-link>
    <h2>Informacje o używanych ciasteczkach</h2>
    <p>Nasza aplikacja korzysta z ciasteczek,</p>
    <p>
      które służą do utrzymania sesji użytkownika oraz uwierzytelniania i autoryzacji.
    </p>
    <p>
      Korzystamy z Twojego adresu e-mail, aby umożliwić logowanie do naszej aplikacji.
    </p>
    <p>
      Adres e-mail jest używany do identyfikacji użytkownika i zapewnienia bezpieczeństwa.
    </p>
    <p>
      Aby dowiedzieć się więcej o ciasteczkach i ich wykorzystaniu, zapoznaj się z naszą
      <a class="link-cookie" href="./Cookies/CookiesPolicy.html" target="_blank"><strong><i>polityką
            prywatności</i></strong></a>.
    </p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
@media (max-width: 480px) {
  .w1 {
    margin: 0px !important;
    padding: 7px !important;
  }
}

.link-cookie {
  color: #03e0f9;
}

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
</style>
