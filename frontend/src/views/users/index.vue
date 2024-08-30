<script setup lang="ts">
import { useUsersStore } from '@/views/users/store'
import CloudDownloadIcon from 'nvd-u/icons/CloudDownload.vue'
import ReloadIcon from 'nvd-u/icons/Reload.vue'
import PlusIcon from 'nvd-u/icons/Plus.vue'
import UIconBtn from 'nvd-u//components/UIconBtn.vue'
import ApmFilter from '@/components/common/crud/ApmFilter.vue'
import NotFoundRow from '@/components/common/crud/NotFoundRow.vue'
import ApmPagination from '@/components/common/crud/ApmPagination.vue'
import MainLoader from '@/components/common/MainLoader.vue'
import Circle from 'src/components/common/Circle.vue'
import { usePlansStore } from 'src/stores/plans.store'
import { onBeforeMount, watch } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { dayjs } from 'nvd-js-helpers/dayjs'
import LoginAsIcon from 'nvd-u/icons/LoginVariant.vue'

const router = useRouter()
const users = useUsersStore()
let plans = usePlansStore()

onBeforeMount(() => {
    if (!users.req.hasLoadedData) users.load()
    if (!plans.req.hasLoadedData) plans.req.send()
})

watch(() => users.req.params, () => {
    users.load()
}, { deep: true })
</script>

<template>
    <div>
        <RouterView/>
        <div class="d-flex align-items-center gap-2 px-4">
            <div class="flex-grow-1">
                <h2>Users</h2>
            </div>
            <UIconBtn tooltip="Create a new User" @click="router.push('/users/create')">
                <PlusIcon/>
            </UIconBtn>
            <UIconBtn tooltip="Download CSV" @click.prevent="users.load()">
                <CloudDownloadIcon/>
            </UIconBtn>
            <UIconBtn
                :loading="users.req.loading"
                tooltip="Reload"
                @click.prevent="users.load()">
                <ReloadIcon/>
            </UIconBtn>
        </div>
        <div class="card p-4" style="min-height: 30em">
            <table class="w100 table-hover crud-table">
                <thead>
                <tr>
                    <th>
                        <ApmFilter
                            field-name="id"
                            field-label="ID"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="name"
                            field-label="Name"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="email"
                            field-label="Email"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="created_at"
                            field-label="Joined"
                            field-type="date"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="sitemaps_count"
                            field-label="Sitemaps"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="activities_count"
                            field-label="Activities"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="ua_created_at"
                            field-label="Last Activity"
                            field-type="date"
                            v-model="users.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="email_verified_at"
                            field-label="Email Verified"
                            v-model="users.req.params"
                            hide-searching
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="invited_by"
                            field-label="Invited By"
                            v-model="users.req.params"
                            hide-searching
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="plan_id"
                            field-label="Plan"
                            field-type="select"
                            :options="[...plans.req.data, {id: 'paid', title: 'Paying Users Only'}]"
                            option-value-field="id"
                            option-label-field="title"
                            v-model="users.req.params"
                            left
                        />
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users.req.data.data"
                    :key="user.id"
                    :class="{'deleted': user.deleted_at}">
                    <td>
                        <div class="all-center gap-1">
                            <Circle
                                v-tooltip="`Online`"
                                v-if="users.onlineUserIdsReq.data.includes(`${user.id}`)"
                                class="text-extra-small flex-shrink-0"
                                color="var(--primary)"
                            />
                            {{ user.id }}
                        </div>
                    </td>
                    <td>
                        <RouterLink :to="`/users/${user.id}`">
                            {{ user.name }}
                        </RouterLink>
                    </td>
                    <td>
                        <div v-tooltip="user.email">
                            <div style="max-width: 18ch" class="text-truncate text-small">{{ user.email }}</div>
                        </div>
                    </td>
                    <td v-tooltip="dayjs(user.created_at).format('MMM DD, HH:mm')">
                        {{ dayjs(user.created_at).fromNow() }}
                    </td>
                    <td>{{ user.sitemaps_count }}</td>
                    <td>{{ user.activities_count }}</td>
                    <td>
                        <div v-if="user.ua_id">
                            <small v-tooltip="user.ua_meta">{{ user.ua_category }} -
                                {{ user.ua_title }}
                                <br>
                                {{ dayjs(user.ua_created_at).fromNow() }}
                            </small>
                        </div>
                    </td>
                    <td v-tooltip="dayjs(user.email_verified_at).format('MMM DD, HH:mm')">
                        {{ user.email_verified_at ? 'Y' : 'N' }}
                    </td>
                    <td>
                        <RouterLink
                            v-if="user.inviter"
                            :to="`/users/${user.inviter.id}`"
                            class="text-small"
                        >
                            <div style="max-width: 16ch" class="text-truncate">
                                {{ user.inviter.email }}
                            </div>
                        </RouterLink>
                    </td>
                    <td>
                        <div v-if="user.plan">
                            {{ user.plan.title }}
                        </div>
                    </td>
                    <td class="table-actions">
                        <UIconBtn
                            tooltip="Login as"
                            :loading="users.loginAsReq.loading"
                            @click="users.loginAs(user)">
                            <LoginAsIcon/>
                        </UIconBtn>
                    </td>
                </tr>
                <NotFoundRow :req="users.req"/>
                </tbody>
            </table>
            <MainLoader v-if="users.req.loading"/>
            <ApmPagination class="mt-4" :req="users.req"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.crud-table {
    td, th {
        padding: 0.3rem 0.5rem;
        text-align: center;
    }
}
</style>
