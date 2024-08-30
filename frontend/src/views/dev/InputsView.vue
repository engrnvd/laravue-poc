<script lang="ts" setup>
import UCheckbox from 'nvd-u/components/UCheckbox.vue'
import UChoices from 'nvd-u/components/UChoices.vue'
import UFileUpload from 'nvd-u/components/UFileUpload.vue'
import USelect from 'nvd-u/components/USelect.vue'
import USwitch from 'nvd-u/components/USwitch.vue'
import UTextarea from 'nvd-u/components/UTextarea.vue'
import { emailRule } from 'src/Vee/rules/email.rule'
import { minLengthRule } from 'src/Vee/rules/minLength.rule'
import { requiredRule } from 'src/Vee/rules/required.rule'
import { useValidator } from 'src/Vee/useValidator'
import { reactive } from 'vue'
import UButton from 'nvd-u/components/UButton.vue'
import UInput from 'nvd-u/components/UInput.vue'

const form = reactive({
    email: '',
    password: '',
    re_password: '',
    agreement: true,
    lights: true,
    gender: 'male',
    fruits: [],
    fruit: '',
    about: '',
    files: [],
})

const fruits = ['Apple', 'Mango', 'Grapes', 'Banana']

const v = useValidator(form, v => {
    v.addRule(requiredRule('email'))
    v.addRule(emailRule('email'))
    v.addRule(requiredRule('password'))
    v.addRule(minLengthRule('password', 5))
    v.addRule(requiredRule('re_password'))
    v.addRule(requiredRule('agreement'))
    v.addCustomRule('re_password', 'Passwords must match', () => form.password === form.re_password)
})

</script>

<template>
    <div class="d-flex gap-2">
        <form action="" @submit.prevent="v.validate()" class="d-flex flex-column" style="max-width: 500px">
            <UInput
                class="mb-4"
                label="Email"
                v-model="form.email"
                :errors="v.errors.email"
            />
            <UInput
                class="mb-4"
                v-model="form.password"
                type="password"
                label="Password"
                :errors="v.errors.password"
                help-text="Minimum 5 characters"
            />

            <USelect
                v-model="form.fruit"
                label="Fruit"
                :options="fruits"
            />

            <UFileUpload :files="form.files" accept="image/*"/>

            <UCheckbox
                class="mb-4"
                label="I agree"
                v-model="form.agreement"
                :errors="v.errors.agreement"
            />
            <USwitch
                class="mb-4"
                label="Lights"
                v-model="form.lights"
                :errors="v.errors.lights"
            />
            <UChoices
                v-model="form.fruits"
                class="mb-4"
                :choices="fruits"
                label="Favorite Fruits"
            />

            <UTextarea
                v-model="form.about"
                class="mb-4"
                label="About"
            />

            <UButton flat>Login</UButton>
        </form>
        <div>
            <pre>v: {{ v }}</pre>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
