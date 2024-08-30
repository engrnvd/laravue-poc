<script lang="ts" setup>
import UModal from 'nvd-u/components/UModal.vue'
import { useProfileStore } from 'src/stores/profile.store'
import UInput from 'nvd-u/components/UInput.vue'
import { useNotify } from 'nvd-u/composables/Notifiy'
import { requiredRule } from 'src/Vee/rules/required.rule'
import { useValidator } from 'src/Vee/useValidator'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = useProfileStore()
const form = reactive({ password: '' })
const notify = useNotify()
const v = useValidator(form, v => {
    v.addRule(requiredRule('password'))
})

function submit() {
    v.validate()
    if (v.hasErrors) return

    profile.deleteAccountReq.send({
        body: JSON.stringify(form)
    }).then(r => {
        notify.info('We are sorry to see you go', 'Your account has been deleted', { permanent: true })
    })
}
</script>

<template>
    <UModal
        title="Delete Account"
        :model-value="true"
        @cancel="router.back()"
        ok-title="Delete"
        @ok="submit"
        :ok-loading="profile.deleteAccountReq.loading"
        cancel-title="Back"
    >
        <UInput
            type="password"
            v-model="form.password"
            label="Enter your account password"
            class="mb-4"
            :errors="v.errors.password"
        />
    </UModal>
</template>
