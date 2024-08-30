<script lang="ts" setup>
const props = defineProps<{
    field?: string,
    value?: string,
}>()
</script>

<template>
    <div>
        <div class="text-small text-muted mb-2" v-if="field || $slots.field">
            <slot name="field">{{ field }}</slot>
        </div>
        <div>
            <slot>{{ value }}</slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
