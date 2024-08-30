<script lang="ts" setup>
import { gotoRedirectUrl, setRedirectUrl } from 'nvd-js-helpers/misc'
import ULoading from 'nvd-u/components/ULoading.vue'
import EmailSendOutlineIcon from 'nvd-u/icons/EmailSendOutline.vue'
import FullPageMessage from 'src/components/common/FullPageMessage.vue'
import PageHeader from 'src/components/common/PageHeader.vue'
import { FetchRequest } from 'src/helpers/fetch-request'
import { useAuthStore } from 'src/stores/auth.store'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

let auth = useAuthStore()
let router = useRouter()
let req = reactive(new FetchRequest('/accept-invite', 'POST'))

function login(res) {
    auth.modals.login = false
    auth.logUserIn(res)
    gotoRedirectUrl(router)
}

onMounted(() => {
    let params = new URLSearchParams(window.location.search)
    let id = params.get('i')
    req.send({
        body: JSON.stringify({ id })
    }).then(res => {
        setRedirectUrl(`/p/${res.sitemap_id}`)
        if (res.needs_registration) {
            auth.form.email = res.email
            auth.form.inviteId = res.id
            if (auth.isLoggedIn) auth.logout().then(res => router.push('/signup'))
            else router.push('/signup')
        } else {
            login(res)
        }
    })
})
</script>

<template>
    <PageHeader>Accept Invite</PageHeader>
    <FullPageMessage>
        <template #icon>
            <EmailSendOutlineIcon/>
        </template>

        <ULoading v-if="!req.loaded"/>
        <p v-else class="text-danger">{{ req.error }}</p>

        <template #action>
            <RouterLink v-if="req.loaded" class="u-btn primary" to="/">Go Home</RouterLink>
        </template>
    </FullPageMessage>
</template>
