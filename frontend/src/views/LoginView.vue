<script lang="ts" setup>
import { gotoRedirectUrl } from 'nvd-js-helpers/misc'
import { _titleCase } from 'nvd-js-helpers/string-helper'
import { Url } from 'nvd-js-helpers/url-helper'
import UButton from 'nvd-u/components/UButton.vue'
import UInput from 'nvd-u/components/UInput.vue'
import { useNotify } from 'nvd-u/composables/Notifiy'
import AppLogo from 'src/components/common/AppLogo.vue'
import { env } from 'src/env'
import { useLoginStore } from 'src/stores/login.store'
import { Validator } from 'src/Vee/validator'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { emailRule } from '../Vee/rules/email.rule'
import { minLengthRule } from '../Vee/rules/minLength.rule'
import { requiredRule } from '../Vee/rules/required.rule'
import { useValidator } from '../Vee/useValidator'

const router = useRouter()
const route = useRoute()
const notify = useNotify()
const auth = useAuthStore()
const store = useLoginStore()
const v = useValidator(auth.form, (v: Validator) => {
    v.addRule(requiredRule('email'))
    v.addRule(emailRule('email'))
    v.addRule(requiredRule('password'), v => !isForgotPage.value)
    v.addRule(minLengthRule('password', 6), v => !isForgotPage.value)

    v.addRule(requiredRule('name'), v => isRegisterPage.value)

    v.addRule(requiredRule('otp'), v => isForgotPage.value && showOtp.value)
    v.addRule(requiredRule('newPassword'), v => isForgotPage.value && showOtp.value)
    v.addRule(minLengthRule('newPassword', 6), v => isForgotPage.value && showOtp.value)
})
const pageTitle = computed(() => _titleCase(<string>route.name))
const isLoginPage = computed(() => route.name === 'login')
const isRegisterPage = computed(() => route.name === 'signup')
const isForgotPage = computed(() => route.name === 'forgot-password')
const showOtp = ref(false)
const gotoLogin = () => router.push('/login')
const gotoRegister = () => router.push('/signup')
const gotoForgotPassword = () => router.push('/forgot-password')

function close() {
    gotoRedirectUrl(router)
}

function submit() {
    v.validate()
    if (v.hasErrors) return

    if (isLoginPage.value) {
        auth.login().then(close)
    } else if (isRegisterPage.value) {
        auth.register().then(close)
    } else if (isForgotPage.value && !showOtp.value) {
        auth.sendForgotReq().then(data => {
            showOtp.value = true
            notify.success('Email sent', 'Please check your inbox')
        })
    } else if (isForgotPage.value && showOtp.value) {
        auth.resetPassword().then(data => {
            showOtp.value = false
            notify.success('Success', 'Your password has been reset')
            gotoLogin()
        })
    }
}

onMounted(() => {
    let email = Url.get('email')
    if (email) {
        auth.form.email = email
        let pEl = document.querySelector('[type=password]')
        if (pEl) pEl.focus()
    }
})
</script>

<template>
    <div class="flex-grow-1 all-center flex-column">
        <div class="d-flex align-items-center">
            <AppLogo class="mr-3" style="width: 2em; height: 2em"/>
            <h1>{{ env.appName }}</h1>
        </div>

        <div class="card" style="min-width: 30em">
            <div style="padding: 3em">
                <h2 class="mb-5">
                    {{ pageTitle }}
                    <span v-if="auth.form.inviteId">to accept the invite</span>
                </h2>
                <form action="" @submit.prevent="submit">
                    <UInput
                        v-if="isRegisterPage"
                        type="text"
                        v-model="auth.form.name"
                        label="Name"
                        class="mb-4"
                        :errors="v.errors.name"
                    />
                    <UInput
                        type="text"
                        v-model="auth.form.email"
                        label="Email"
                        class="mb-4"
                        :errors="v.errors.email"
                        :disabled="!!auth.form.inviteId"
                    />
                    <UInput
                        type="password"
                        v-model="auth.form.password"
                        label="Password"
                        class="mb-4"
                        :errors="v.errors.password"
                        v-if="!isForgotPage"
                    />
                    <UInput v-if="isForgotPage && showOtp"
                            type="text"
                            v-model="auth.form.otp"
                            label="OTP"
                            class="mb-4"
                            :errors="v.errors.otp"
                    />
                    <UInput v-if="isForgotPage && showOtp"
                            type="password"
                            v-model="auth.form.newPassword"
                            label="New Password"
                            class="mb-4"
                            :errors="v.errors.newPassword"
                    />

                    <div class="d-flex align-items-center justify-content-between">
                        <UButton :loading="auth.loginReq.loading || auth.signupReq.loading || auth.forgotReq.loading">
                            {{ isLoginPage ? 'Login' : 'Submit' }}
                        </UButton>

                        <a href="" class="text-base" v-if="isLoginPage"
                           @click.prevent="gotoForgotPassword">Forgot password?</a>
                    </div>
                </form>

                <SignInWithGoogle v-if="!auth.form.inviteId"/>
            </div>
            <UButton
                v-if="!auth.form.inviteId"
                flat secondary
                class="w100 mt-4 text-center register-btn"
                @click.prevent="() => isLoginPage ? gotoRegister() : gotoLogin()">
                {{ isLoginPage ? 'Dont have an account yet? Sign up' : 'Back to Login' }}
            </UButton>
        </div>
    </div>
</template>

<style scoped lang="scss">

.register-btn {
    display: block;
    height: 4em;
    text-transform: none;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}

</style>

