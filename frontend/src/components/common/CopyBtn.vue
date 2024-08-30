<script lang="ts" setup>
import { _sleep } from 'nvd-js-helpers/misc'
import UIconBtn from 'nvd-u/components/UIconBtn.vue'
import CheckIcon from 'nvd-u/icons/Check.vue'
import CopyIcon from 'nvd-u/icons/ContentPaste.vue'
import { ref } from 'vue'

const props = defineProps<{ text: string }>()
const copied = ref(false)

async function copy() {
    copied.value = true
    await navigator.clipboard.writeText(props.text)
    await _sleep(2000)
    copied.value = false
}
</script>

<template>
    <UIconBtn class="copy-btn" @click.prevent="copy">
        <CheckIcon v-if="copied"/>
        <CopyIcon v-else/>
    </UIconBtn>
</template>
