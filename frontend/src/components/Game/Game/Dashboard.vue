<template>
  <div class="dashboard">
    <h1>{{ t('dashboard.title') }}</h1>
    <div class="dashboard-header">
      <div class="player-info">
        <img src="/game/player/avatar.jpg" alt="Player Avatar" class="player-avatar" />
        <div class="player-details">
          <h2>{{ player.name }}</h2>
          <p>{{ t('dashboard.level') }}: {{ player.level }}</p>
          <p>{{ t('dashboard.experience') }}: {{ player.experience }}</p>
        </div>
      </div>
      <div class="account-info">
        <p>{{ t('dashboard.balance') }}: ${{ player.balance }}</p>
        <p>{{ t('dashboard.resources') }}: {{ player.resources }}</p>
      </div>
    </div>
    <div class="notifications">
      <h3>{{ t('dashboard.notifications') }}</h3>
      <ul>
        <li v-for="notification in player.notifications" :key="notification.id">
          {{ notification.message }}
        </li>
      </ul>
    </div>
    <div class="quick-links">
      <h3>{{ t('dashboard.quickLinks') }}</h3>
      <ul>
        <li><router-link to="/crims-city/maingame">{{ t('dashboard.maingame') }}</router-link></li>
        <li><router-link to="/crims-city/settings">{{ t('dashboard.settings') }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const player = {
  name: 'John Doe',
  level: 10,
  experience: 2500,
  balance: 10000,
  resources: 150,
  notifications: [
    { id: 1, message: 'You have successfully completed the mission.' },
    { id: 2, message: 'Your gang has won the territory war.' }
  ]
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background-color: rgba(#292929, 0.5);
  border-radius: 8px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.player-info {
  display: flex;
  align-items: center;
}

.player-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.player-details h2 {
  margin: 0;
}

.account-info p {
  margin: 5px 0;
}

.notifications, .quick-links {
  margin-bottom: 20px;
}

.notifications ul, .quick-links ul {
  list-style: none;
  padding: 0;
}

.notifications li, .quick-links li {
  background-color: #393939;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
}

.quick-links li a {
  color: #007bff;
  text-decoration: none;
}

.quick-links li a:hover {
  text-decoration: underline;
}
</style>
