<script lang="ts" setup>
import UIconBtn from 'nvd-u/components/UIconBtn.vue'
import ChevronRightIcon from 'nvd-u/icons/ChevronRight.vue'

const props = defineProps({
    modelValue: {},
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <UIconBtn class="collapse-btn" inline @click.prevent.stop="emit('update:modelValue', !modelValue)">
        <ChevronRightIcon class="collapse-icon" :class="{expanded: modelValue}"/>
    </UIconBtn>
</template>

<style scoped lang="scss">
.collapse-icon {
    transition: transform 250ms;

    &.expanded {
        transform: rotate(90deg);
    }
}

</style>
