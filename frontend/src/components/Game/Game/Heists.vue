<template>
  <div class="heist">
    <h2>Napad</h2>
    <div v-if="currentHeist">
      <h3>{{ currentHeist.name }}</h3>
      <p>{{ currentHeist.description }}</p>
      <div>
        <label for="weapon">Wybierz broń:</label>
        <select v-model="selectedWeapon" id="weapon">
          <option v-for="weapon in inventory.weapons" :key="weapon.id" :value="weapon">
            {{ weapon.name }} (DMG: {{ weapon.damage }})
          </option>
        </select>
      </div>
      <div>
        <label for="armor">Wybierz kamizelkę:</label>
        <select v-model="selectedArmor" id="armor">
          <option v-for="armor in inventory.armors" :key="armor.id" :value="armor">
            {{ armor.name }} (DEF: {{ armor.defense }})
          </option>
        </select>
      </div>
      <button @click="startHeist">Rozpocznij napad</button>
    </div>
    <div v-else>
      <p>Brak napadów do wykonania.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Weapon {
  id: number;
  name: string;
  damage: number;
}

interface Armor {
  id: number;
  name: string;
  defense: number;
}

interface Heist {
  id: number;
  name: string;
  description: string;
}

const inventory = ref({
  weapons: [
    { id: 1, name: 'Pistolet', damage: 10 },
    { id: 2, name: 'Karabin', damage: 20 },
    { id: 3, name: 'Shotgun', damage: 25 },
  ],
  armors: [
    { id: 1, name: 'Kamizelka Lekką', defense: 5 },
    { id: 2, name: 'Kamizelka Ciężka', defense: 15 },
    { id: 3, name: 'Kamizelka Kuloodporna', defense: 20 },
  ],
});

const currentHeist = ref<Heist | null>({
  id: 1,
  name: 'Napad na Bank',
  description: 'Planowany napad na bank w centrum miasta.',
});

const selectedWeapon = ref<Weapon | null>(null);
const selectedArmor = ref<Armor | null>(null);

const startHeist = () => {
  if (selectedWeapon.value && selectedArmor.value) {
    alert(`Rozpoczynasz napad używając ${selectedWeapon.value.name} i ${selectedArmor.value.name}`);
    // Dalsza logika napadu...
  } else {
    alert('Musisz wybrać broń i kamizelkę przed rozpoczęciem napadu!');
  }
};
</script>

<style scoped>
.heist {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  border-radius: 8px;
}

h2, h3 {
  text-align: center;
}

label {
  display: block;
  margin-top: 10px;
}

select {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
