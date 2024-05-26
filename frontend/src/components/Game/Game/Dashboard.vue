<template>
  <Loader v-if="isLoading" />
  <div v-else class="dashboard">
    <h1>{{ player.p_nick }}</h1>
    <div class="dashboard-header">
      <div class="player-info">
        <img :src="`/players/imagesProfile/${player.p_ids_user}.jpg`" alt="Player Avatar" class="player-avatar" />

        <div class="player-details">

          <div class="player-details-col1">
            <p>{{ t('dashboard.level') }}<span>:</span></p>
            <p>{{ t('dashboard.experience') }}<span>:</span></p>
            <p>{{ t('dashboard.healthPoints') }}<span>:</span></p>
            <p>{{ t('dashboard.reputation') }}<span>:</span></p>
          </div>
          <div class="player-details-col2">
            <p>{{ player.p_level }}</p>
            <p>{{ player.p_experience }}</p>
            <p>
              <meter class="health-progress" :value="player.p_health_points" min="0" max="100">
                {{ player.p_health_points }}
              </meter>
              &nbsp; {{ player.p_health_points }} %
            </p>
            <p>{{ player.p_reputation }}</p>
          </div>

        </div>

      </div>
      <div class="account-info">
        <p>{{ t('dashboard.balance') }}: $ {{ player.p_money }}</p>
      </div>
    </div>
    <div class="quick-links">
      <h3>{{ t('dashboard.quickLinks') }}</h3>
      <ul>
        <li><router-link to="/crims-city/settings">{{ t('dashboard.settings') }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getConfig } from 'config';
import { onMounted } from 'vue';
import Loader from '../../_Core/Loader.vue';

const config = getConfig();
const { t } = useI18n();

const isLoading = ref(true);
const player = ref([]);

const fetchDashboard = async () => {
  try {
    const response = await fetch(`${config.API_URL}/game/dashboard`, {
      method: config.method,
      credentials: config.credentials,
      headers: config.headers
    });
    if (response.ok) {
      const playerData = await response.json();
      player.value = playerData[0];
      isLoading.value = false;
      console.log(player);
    }

  } catch (error) {
    console.error("Error fetching building data:", error);
  }
};

onMounted(() => {
  fetchDashboard();
});
</script>

<style scoped>
span{
  color: white;
  width: auto;
  margin-left: 5px;
}
p{
  display: flex;
  justify-content: space-between;
}
h1 {
  margin-bottom: 10px;
}

.dashboard {
  padding: 20px;
  background-color: rgba(#292929, 0.5);
  border-radius: 8px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.player-details {
  display: flex;
  flex-direction: row;
}

.player-details-col2 {
  margin-left: 5px;
}

.player-details h2 {
  margin: 0;
}

.account-info p {
  margin: 5px 0;
}

.notifications,
.quick-links {
  margin-bottom: 20px;
}

.notifications ul,
.quick-links ul {
  list-style: none;
  padding: 0;
}

.notifications li,
.quick-links li {
  background-color: #393939;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
}

.quick-links li a {
  color: #00ffdd;
  text-decoration: none;
}

.quick-links li a:hover {
  text-decoration: underline;
}





.health-meter {
  display: flex;
  align-items: center;
}

.health-progress {
  width: 100px;
  /* Dostosuj szerokość paska postępu według potrzeb */
}

/* Dostosuj styl paska postępu do swoich preferencji */
.health-progress::-webkit-meter-bar {
  background-color: #ccc;
}

.health-progress::-webkit-meter-optimum-value,
.health-progress::-webkit-meter-suboptimum-value,
.health-progress::-webkit-meter-even-less-good-value {
  background-color: #4CAF50;
  /* Zielony kolor dla wartości dobrych */
}

.health-progress::-webkit-meter-suboptimum-value {
  background-color: #FFEB3B;
  /* Żółty kolor dla wartości przeciętnych */
}

.health-progress::-webkit-meter-even-less-good-value {
  background-color: #FF5722;
  /* Czerwony kolor dla wartości złych */
}
</style>
