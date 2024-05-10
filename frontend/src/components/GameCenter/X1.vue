<template>
    <div class="Game-X1">
        <div class="flex-down">
            <router-link to="/ViewGame"><button> <div>{{ $t('menu.view') }}</div></button></router-link>
            <router-link to="/pubs"><button>{{ $t('menu.pub') }}</button></router-link>
            <router-link to="/rubs"><button>{{ $t('menu.rubs') }}</button></router-link>
            <router-link to="/maps"><button>{{ $t('menu.maps') }}</button></router-link>
            <router-link to="/rubs"><button>{{ $t('menu.shop') }}</button></router-link>
            <router-link to="/rubs"><button>{{ $t('menu.race') }}</button></router-link>
            <router-link to="/character"><button>{{ $t('menu.character') }}</button></router-link>
            <router-link to="/market"><button>{{ $t('menu.market') }}</button></router-link>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.flex-down{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 150px;
}
button{
    width: 100%;
}
</style>