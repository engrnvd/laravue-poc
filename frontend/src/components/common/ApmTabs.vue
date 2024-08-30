<script setup lang="ts">
type ModelType = string | number

let p = defineProps<{
    modelValue: ModelType,
    items: ModelType[],
}>()

let emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="apm-tabs d-flex align-items-end">
        <div
            class="tab px-5 py-3 has-hover"
            :class="{active: modelValue === item}"
            v-for="item in items"
            @click="emit('update:modelValue', item)"
        >{{ item }}
        </div>
        <div class="end flex-grow-1"></div>
    </div>
</template>

<style scoped lang="scss">
.apm-tabs {
    .tab {
        cursor: pointer;
        font-weight: bold;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius) var(--border-radius) 0 0;

        &:not(:first-child) {
            border-left: none;
        }

        &.active {
            border-bottom: none;
            background-color: transparent !important;
            font-weight: normal;
        }
    }

    .end {
        border-bottom: 1px solid var(--border-color);
    }
}
</style>
