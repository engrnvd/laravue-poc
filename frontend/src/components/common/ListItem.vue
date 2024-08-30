<script lang="ts" setup>
let props = defineProps<{
    cols: number,
}>()
</script>

<template>
    <div class="card p-4 gap-4 grid align-items-center list-item" :class="`col-${cols}`">
        <slot></slot>
        <div class="d-flex align-items-center gap-2 justify-content-end" v-if="$slots.actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
