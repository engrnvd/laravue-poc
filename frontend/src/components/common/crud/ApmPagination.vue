<script setup lang="ts">
import { FetchRequest } from '@/helpers/fetch-request'
import UIconBtn from 'nvd-u/components/UIconBtn.vue'
import ChevronLeftIcon from 'nvd-u/icons/ChevronLeft.vue'
import ChevronRightIcon from 'nvd-u/icons/ChevronRight.vue'
import { computed, defineProps } from 'vue'

const props = defineProps({
    req: FetchRequest,
})

const numPages = computed(() => Math.ceil(props.req.data.total / props.req.params.perPage))

</script>

<template>
    <div class="p-4 apm-pagination d-flex gap-4 align-items-center" v-if="req.data?.data?.length">
        <div class="info text-muted">
            Showing {{ req.data.from }} - {{ req.data.to }} of {{ req.data.total }}
        </div>
        <div class="buttons d-flex align-items-center justify-content-center gap-4 flex-grow-1">
            <UIconBtn :disabled="req.params.page <= 1" @click="req.params.page --">
                <ChevronLeftIcon/>
            </UIconBtn>
            <UIconBtn
                v-for="n in numPages"
                @click="req.params.page = n"
                :disabled="req.params.page === n"
            >{{ n }}
            </UIconBtn>
            <UIconBtn :disabled="req.params.page >= numPages" @click="req.params.page ++">
                <ChevronRightIcon/>
            </UIconBtn>
        </div>
        <div class="per-page text-muted">
            Per page
            <select v-model="req.params.perPage" style="outline: none; border: none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
    </div>
</template>

<style scoped>

.apm-pagination {
    font-size: 0.75rem;

    .buttons {
        .u-icon-btn {
            color: var(--primary);
        }
    }

    .arrow-btn {
        .material-design-icon {
            font-size: 1.5rem !important;
        }
    }

    .per-page {
        select {
            outline: none;
            border: none;
            background-color: transparent;
            color: var(--main-text-color);
        }
    }
}

</style>
