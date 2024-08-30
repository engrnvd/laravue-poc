<script setup lang="ts">

import FullPageMessage from '@/components/common/FullPageMessage.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import EmailCheckOutlineIcon from 'nvd-u/icons/EmailCheckOutline.vue'
import { useAuthStore } from 'src/stores/auth.store'
import { onMounted } from 'vue'

let auth = useAuthStore()

onMounted(() => {
    auth.refreshUser()
})
</script>

<template>
    <div class="all-center flex-grow-1">
        <div class="card p-5">
            <h2 class="text-">Thank you for verifying your email!</h2>
            <div class="text-center">
                <RouterLink class="u-btn primary" to="/">Go Home</RouterLink>
            </div>
        </div>
    </div>
</template>
