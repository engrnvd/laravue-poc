<script lang="ts" setup>
const props = withDefaults(defineProps<{
    color: string,
}>(), {
    color: 'var(--gray)',
})
</script>

<template>
    <div class="circle"></div>
</template>

<style scoped lang="scss">
.circle {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: v-bind(color);
}
</style>
