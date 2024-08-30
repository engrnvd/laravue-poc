<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth.store'
import {onBeforeMount} from 'vue'

const router = useRouter()
const auth = useAuthStore()

onBeforeMount(() => {
    if (auth.isLoggedIn) router.replace('/projects')
    else router.replace('/login')
})

</script>

<template>
</template>
