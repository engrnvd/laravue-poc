<script setup lang="ts">
import ReloadReqBtn from 'src/components/common/ReloadReqBtn.vue'
import { FetchRequest } from 'src/helpers/fetch-request'

defineProps<{
    title: string,
    req: FetchRequest | any,
}>()
</script>

<template>
    <div class="d-flex align-items-center w100">
        <h2 class="flex-grow-1 text-center">{{ title }}</h2>
        <ReloadReqBtn :req="req"/>
    </div>
</template>

<style scoped lang="scss">

</style>
