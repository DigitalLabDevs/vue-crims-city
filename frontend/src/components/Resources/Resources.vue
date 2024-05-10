<script setup>

</script>

<template>
    <div class="Resources">
        <div class="fxr">
            <div>Kapsle</div>
            <div>300</div>
        </div>

        <div class="fxr">
            <div>Złoto</div>
            <div>3000</div>
        </div>

        <div class="fxr">
            <div>Zdrowie</div>
            <div>100%</div>
            <div><progress value="100" max="100"></progress></div>
        </div>

        <div class="fxr">
            <div>Zmęczenie</div>
            <div>100%</div>
            <div><progress value="100" max="100"></progress></div>
        </div>


    </div>
</template>

<style scoped>
.fxr,
.Resources {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.fxr,
.fxr>div {
    margin-left: 2px;
    margin-right: 2px;
}

.fxr>div:nth-child(2) {
    color: greenyellow;
}
progress{
    width: 50px;
}
.Resources{
    border: 1px solid green;
    padding: 3px;
}
</style>