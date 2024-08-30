<script lang="ts" setup>
import MainLoader from '@/components/common/MainLoader.vue'
import { useAuthStore } from '@/stores/auth.store'
import UButton from 'nvd-u/components/UButton.vue'
import UDropdown from 'nvd-u/components/UDropdown.vue'
import UMenuItem from 'nvd-u/components/UMenuItem.vue'
import AccountIcon from 'nvd-u/icons/Account.vue'
import AccountOutlineIcon from 'nvd-u/icons/AccountOutline.vue'
import CreditCardOutlineIcon from 'nvd-u/icons/CreditCardOutline.vue'
import LogoutIcon from 'nvd-u/icons/Logout.vue'
import TextBoxMultipleOutlineIcon from 'nvd-u/icons/TextBoxMultipleOutline.vue'
import UserAvatar from 'src/components/common/UserAvatar.vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
    auth.logout().then(d => {
        router.push('/login')
    })
}
</script>

<template>
    <UDropdown v-if="auth.isLoggedIn" left>
        <UButton id="profile-btn" style="border: 1px solid var(--border-color)" icon transparent secondary
                 v-tooltip="'Profile'">
            <UserAvatar :user="auth.user"/>
        </UButton>
        <template #content>
            <div class="user-dd py-2" style="min-width: 12em;">
                <div class="text-muted text-small px-4 py-2">
                    <div class="font-weight-bold mb-2">{{ auth.user.name }}</div>
                    <div>{{ auth.user.email }}</div>
                </div>
                <hr class="my-2">
                <UMenuItem @click="router.push('/profile')">
                    <AccountIcon/>
                    Account
                </UMenuItem>
                <UMenuItem>
                    <CreditCardOutlineIcon/>
                    Subscription
                </UMenuItem>
                <UMenuItem @click="router.push('/projects')">
                    <TextBoxMultipleOutlineIcon/>
                    Projects
                </UMenuItem>
                <hr class="my-2">
                <UMenuItem @click="logout">
                    <LogoutIcon/>
                    Logout
                </UMenuItem>
            </div>
        </template>
    </UDropdown>
    <UButton id="profile-btn" v-else icon transparent @click="auth.modals.login = true" v-tooltip="'Profile'">
        <AccountOutlineIcon/>
    </UButton>
    <MainLoader v-if="auth.logoutReq.loading"/>
</template>

<style scoped lang="scss">
</style>
