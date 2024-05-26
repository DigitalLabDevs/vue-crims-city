<template>
    <div class="SETTINGS">
        <div class="settings-links">
            <router-link to="/crims-city/settings/language">{{ t('settings.language') }}</router-link>
            <router-link to="/crims-city/settings/change-password">{{ t('settings.changePassword') }}</router-link>
            <router-link to="/crims-city/settings/change-email">{{ t('settings.changeEmail') }}</router-link>
        </div>
        <div class="settings-rout">
            <router-view name="settings"></router-view>
        </div>

    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.settings-links {
    display: flex;
    flex-direction: column;
}
.settings-rout{
    padding: 5px;
}
</style>
