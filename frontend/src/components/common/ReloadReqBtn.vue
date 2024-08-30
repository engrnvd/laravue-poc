<script setup lang="ts">
import UIconBtn from 'nvd-u/components/UIconBtn.vue'
import ReloadIcon from 'nvd-u/icons/Reload.vue'
import { FetchRequest } from 'src/helpers/fetch-request'

defineProps<{
    req: FetchRequest | any,
}>()
</script>

<template>
    <UIconBtn
        :loading="req.loading"
        tooltip="Reload"
        @click.prevent="req.send()">
        <ReloadIcon/>
    </UIconBtn>
</template>

<style scoped lang="scss">

</style>
