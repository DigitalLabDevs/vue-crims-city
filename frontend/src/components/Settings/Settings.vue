<template>


            <div>
                <span>Twoja nazwa użytkownika: Vikary17</span>
                <div class="Language-Selector">
                    <div>{{ $t("topbar.chooseLanguage") }}</div>
                    <div>
                        <LanguageSelector />
                    </div>
                </div>

                <div>
                  Zmień hasło
                </div>
                <div>
                  Zmień emaila
                </div>

            </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import LanguageSelector from '../Language/LanguageSelector.vue';

const router = useRouter();

const closeModal = () => {
    router.push('/');
};
</script>

<style scoped>

.Language-Selector {
    display: flex;
    align-items: center;
}

.Language-Selector>div {
    margin-left: 2px;
    margin-right: 2px;
}
</style>
``