<script setup lang="ts">
import { _titleCase } from 'nvd-js-helpers/string-helper'
import Sidebar from 'src/components/layout/sidebar/Sidebar.vue'
import { env } from 'src/env'
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainHeader from './components/layout/header/MainHeader.vue'
import MainFooter from './components/layout/MainFooter.vue'

const route = useRoute()

watch(() => route.name, routeName => {
    let title = env.appName
    if (routeName) {
        title = `${_titleCase(routeName)} | ${title}`
    }
    document.querySelector('title').innerHTML = title
})
</script>

<template>
    <div class="main-container d-flex flex-column">
        <MainHeader v-if="route.meta?.auth || route.name === 'sitemap'"/>

        <div class="d-flex flex-grow-1 content-container">
            <Sidebar v-if="route.meta?.auth"/>
            <main :class="route.name" class="flex-grow-1 main-content d-flex flex-column">
                <RouterView/>
            </main>
        </div>

        <MainFooter/>
    </div>
</template>

<style lang="scss">

.main-container {
    height: 100vh;
    overflow: hidden;

    .content-container {
        overflow-y: auto;
        overflow-x: hidden;
    }

    .main-content {
        max-width: 1000px;

        &.profile {
            max-width: 550px;
        }

        &.sitemap, &.login, &.signup, &.forgot-password {
            max-width: 100%;
        }
    }
}

</style>
