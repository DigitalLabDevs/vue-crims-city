<template>
  <div class="Game-MenuCenter">


    <div class="Game-MenuLinks">
      <router-link to="/quests">{{ $t('menu.quest') }}</router-link>
      <router-link to="/messages">{{ $t('menuCenter.messages') }}</router-link>
      <router-link to="/chat">Chat</router-link>
    </div>

    <!-- <hr> -->
    <div class="events">
      <div class="MenuHeader">Zdarzenia:</div>
      <div :class="['Game-MenuEvents', isExpanded ? 'expanded' : 'no-expanded']">

        <div :class="isExpanded ? 'dsb' : 'no-dsb'" class="MenuContent">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec nunc vel magna congue dictum. Integer ut
          tempus libero. Sed sodales tincidunt justo, ac pharetra justo tristique ac.
        </div>
      </div>
      <div class="Game-MenuToggle" @click="toggleMenu">
        <!-- Strzałka w dół -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isExpanded = ref(false);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: row;
  border: 1px solid green;
  align-items: center;
  justify-content: space-around;
}

.Game-MenuLinks>* {
  padding: 0px 5px 0px 5px;

}

.Game-MenuLinks {
  padding: 5px;
  display: flex;
  justify-content: space-around;
  border: 1px solid green;
}

.dsb {
  display: block;
}

.no-dsb {
  display: none;
}

.expanded {
  height: 300px;
  transition: 0.3s;

  /* position: relative; */
}

.no-expanded {
  height: 10px;
  transition: 0.3s;
}

.Game-MenuEvents {
  width: 70%;
  overflow-x: hidden;
}

.MenuHeader {
  font-weight: bold;
}

.MenuContent {
  overflow-y: scroll;
  /* overflow: hidden; */
}



.Game-MenuCenter {
  display: flex;
  width: 600px;
  border: 1px solid green;
  /* padding: 3px; */
  flex-direction: column;
}

.Game-MenuToggle svg {
  fill: white;
  cursor: pointer;
}
</style>
