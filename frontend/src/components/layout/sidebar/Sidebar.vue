<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store'
import UButton from 'nvd-u/components/UButton.vue'
import AccountMultipleOutlineIcon from 'nvd-u/icons/AccountBoxMultipleOutline.vue'
import AccountOutlineIcon from 'nvd-u/icons/AccountCircleOutline.vue'
import PlusIcon from 'nvd-u/icons/Plus.vue'
import TextBoxMultipleOutlineIcon from 'nvd-u/icons/TextBoxMultipleOutline.vue'
import SidebarLink from 'src/components/layout/sidebar/SidebarLink.vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

</script>

<template>
    <div class="main-sidebar p-4 my-4 d-flex flex-column gap-2">
        <UButton outline class="mb-4" @click="router.push('/projects/create')">
            <PlusIcon/>
            New Project
        </UButton>
        <SidebarLink path="/projects">
            <TextBoxMultipleOutlineIcon/>
            Projects
        </SidebarLink>
        <SidebarLink path="/team">
            <AccountMultipleOutlineIcon/>
            Team
        </SidebarLink>
        <SidebarLink path="/profile">
            <AccountOutlineIcon/>
            Account
        </SidebarLink>
    </div>
</template>

<style lang="scss">
.main-sidebar {

}
</style>
