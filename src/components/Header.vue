<template>
    <md-toolbar>
        <h1 class="md-title">
            <router-link :to="{name: 'home'}">
                Circle CI Dashboard
            </router-link>
        </h1>
    </md-toolbar>
</template>

<style scoped lang="scss">
    h1 a {
        color: white !important;

        &:hover,
        &:active {
            text-decoration: none !important;
         }
    }
</style>