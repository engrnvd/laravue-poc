<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
    path: string,
}>()
</script>

<template>
    <RouterLink class="sidebar-link px-4 py-3 d-flex align-items-center gap-6" :to="path">
        <slot></slot>
    </RouterLink>
</template>

<style lang="scss">
.sidebar-link {
    min-width: 15em;

    &.router-link-active {
        font-weight: bold;
        text-decoration: none;
        border-bottom: none;
    }

    .material-design-icon {
        font-size: 1.5em;
    }
}

</style>
