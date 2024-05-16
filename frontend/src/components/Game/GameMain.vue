<template>
  <div>GAME
    <div class="logout">
      <LogoutView />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
import LogoutView from '../_AuthContext/LogoutView.vue';

  const store = useStore();
  const user = computed(() => store.state.user);

</script>

<style scoped>

</style>
