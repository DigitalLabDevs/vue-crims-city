<script setup>

</script>

<template>
    <div class="Messages-Links">
        <div class="Links-MSG">
            <div>
                <router-link to="/messages">Szpieguj</router-link>
            </div>
            <div>
                <span>2</span>
            </div>
        </div>
        <router-link to="/messages">Raporty</router-link>
        <router-link to="/messages">System</router-link>
    </div>
</template>

<style scoped>
.Messages-Links {
    display: flex;
    justify-content: space-around;
}

.Game-MenuCenter {
    display: flex;
}

.Links-MSG {
    display: flex;
    padding: 5px;
    border: 1px solid white;
}
</style>