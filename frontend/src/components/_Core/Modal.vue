<template>
  <div class="modal-container" v-show="isModalOpen">
    <div class="modal-background" @click="closeModal">
      <div class="modal-content">
        <component :is="componentToShow" />
        <button @click="closeModal">Zamknij</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

const isModalOpen = ref(false);
const componentToShow = ref(null);

const openModal = (component) => {
  componentToShow.value = component;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

export { openModal };
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.modal-content button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
