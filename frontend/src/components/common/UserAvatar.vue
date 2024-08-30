<script lang="ts" setup>
import type { User } from 'src/interfaces/User.interface'

let props = defineProps<{
    user: Partial<User>,
}>()

</script>

<template>
    <img class="avatar sm"
         :src="user.avatar"
         :alt="user.name[0]"
    >
</template>

<style scoped lang="scss">
.avatar {
    background-color: rgba(0, 0, 0, 0.04);
    position: relative;
    overflow: hidden;

    &::after {
        content: attr(alt);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        color: var(--light);
        background-color: var(--primary);
        z-index: 2;
        font-weight: 900;
    }
}
</style>
