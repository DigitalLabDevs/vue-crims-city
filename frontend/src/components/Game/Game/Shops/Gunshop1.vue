<template>
  <div class="Gunshop1" @click="closeMenu">
    GUNSHOP1
    <img class="bg" src="/game/places/gunshops/gunshop1.jpg" />
    
    <!-- TooltipImage -->
    <TooltipImage
       imageSrc="/game/images/guns/gun1.png"
       posx="96"
       posy="12"
       sizex="100"
       @click.stop="showMenuClick"
    >
      <p>Karabinek MZKP-C3</p>
      <p>Atak: 50</p>
      <p>Szybkostrzelność: 45/min</p>
      <p>Koszt: $1000</p>
      <p>Ulepszona wersja Karabinku <strong>MK14A1</strong></p>
    </TooltipImage>



    <TooltipImage
       imageSrc="/game/images/guns/gun1.png"
       posx="132"
       posy="12"
       sizex="100"
       @click.stop="showMenuClick"
    >
      <p>Karabinek MK14A1</p>
      <p>Atak: 50</p>
      <p>Szybkostrzelność: 50/min</p>
      <p>Koszt: $2000</p>
    </TooltipImage>


    <!-- Dodatkowe menu -->
    <div v-if="showMenu.visible" class="menu-modal" :style="{ top: showMenu.y + 'px', left: showMenu.x + 'px' }">

      <span @click.stop="buyWeapon">Kup</span>
      <span @click.stop="showMoreInfo">Pokaż więcej</span>
      <span @click.stop="closeModal">Zamknij</span>
      <!-- Dodaj inne opcje menu tutaj -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TooltipImage from '../../Core/TooltipImage.vue';

const showMenu = ref(false);

const buyWeapon = () => {
  // Logika zakupu broni
};

const showMenuClick = (event) => {
  // Oblicz pozycję kliknięcia
  const posX = event.clientX;
  const posY = event.clientY;

  // Pobierz wymiary obrazka
  const imageWidth = event.target.width;
  const imageHeight = event.target.height;

  // Oblicz pozycję menu
  const menuX = posX + imageWidth + 100; // 100px od prawej strony obrazka
  const menuY = posY;

  // Ustaw pozycję menu
  showMenu.value = { visible: true, x: menuX, y: menuY };
};



const closeModal = () => {
  showMenu.value = false;
};

const closeMenu = (event) => {
  if (!event.target.closest('.menu-modal')) {
    showMenu.value = { visible: false, x: 0, y: 0 };
  }
};


</script>

<style scoped>

.Gunshop1 {
  user-select: none;
  width: 600px;
  height: auto;
  position: relative;
}

.bg {
  width: 100%;
  height: auto;
}

.gun {
  position: absolute;
  top: 88px;
  left: -20px;
  transform: scale(0.60);
  cursor: pointer;
  transition: transform 200ms;
}

.gun:hover {
  filter: drop-shadow(2px 2px 10px rgb(211, 93, 24));
}

.menu-modal {
  position: absolute;
  /* top: 50%; */
  /* left: 50%; */
  transform: translate(-250%, -200%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
span{
  width: 150px;
}
span:hover{
  color: yellowgreen;
}
</style>
