<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

onBeforeMount(() => {
    if (auth.isLoggedIn) router.replace('/profile')
    else router.replace('/login')
})

</script>

<template>
</template>
