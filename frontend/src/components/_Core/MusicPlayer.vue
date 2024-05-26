<template>
  <div class="audio-player">
    <span @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Howl } from 'howler';

// Definiowanie stanu odtwarzania
const isPlaying = ref(false);
let sound;

const togglePlay = () => {
  if (isPlaying.value) {
    sound.pause();
  } else {
    sound.play();
  }
  isPlaying.value = !isPlaying.value;
};

onMounted(() => {
  // Inicjalizacja Howl z odpowiednim plikiem audio
  sound = new Howl({
    src: ['/music/Remember_the_Name(Instrumental).mp3'],
    loop: true,
    onend: function () {
      console.log('Finished!');
    }
  });
});

onUnmounted(() => {
  // Zatrzymanie dźwięku po odmontowaniu komponentu
  if (sound) {
    sound.stop();
  }
});
</script>

<style scoped>
.audio-player {
  display: flex;
  align-items: center;
}
</style>
