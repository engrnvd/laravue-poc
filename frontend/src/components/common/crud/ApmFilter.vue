<script setup lang="ts">
import UDropdown from 'nvd-u/components/UDropdown.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import CaretDown from 'nvd-u/icons/ChevronDown.vue'
import SortAscending from 'nvd-u/icons/ArrowUp.vue'
import SortDescending from 'nvd-u/icons/ArrowDown.vue'
import FilterIcon from 'nvd-u/icons/Filter.vue'
import UMenuItem from 'nvd-u/components/UMenuItem.vue'
import USelect from 'nvd-u/components/USelect.vue'
import UChoices from 'nvd-u/components/UChoices.vue'
import USwitch from 'nvd-u/components/USwitch.vue'
import UButton from 'nvd-u/components/UButton.vue'

type SortType = 'asc' | 'desc'

let p = withDefaults(defineProps<{
    fieldLabel: string, //Name of the field to be displayed
    fieldName: string, // name to be sent to onChange() (to the server e.g.)
    fieldType?: 'text' | 'number' | 'date' | 'select' | 'choices',
    modelValue?: any | { sort: string, sortType: SortType },
    hideSorting?: boolean, // sometimes you don't want to allow sorting via a field
    hideSearching?: boolean,
    //Following options apply only to 'select' type
    optionLabelField?: string, // field to be displayed for an option
    optionValueField?: string, // field whose value is to be set for the selected option
    options?: any[],
}>(), {
    fieldLabel: '',
    fieldName: '',
    modelValue: undefined,
    fieldType: 'text',
    hideSorting: false,
    hideSearching: false,
    optionLabelField: '',
    optionValueField: '',
    options: [],
})

let ddEl = ref()
let query = ref('')
let selectAllChoices = ref(false)
let selectedChoices = ref([])

let isSorted = computed(() => p.modelValue.sort === p.fieldName)
let isAsc = computed(() => p.modelValue.sortType === 'asc')
let isDesc = computed(() => p.modelValue.sortType === 'desc')
let isFiltered = computed(() => p.modelValue[p.fieldName])

function sort(sortType: SortType = 'asc') {
    p.modelValue.page = 1 // fix: if you are on page > 1, and you sort, it shows unexpected results
    if (isSorted.value && sortType === p.modelValue.sortType) return
    p.modelValue.sort = p.fieldName
    p.modelValue.sortType = sortType
    close()
}

function close() {
    ddEl.value.open = false
}

function filter() {
    p.modelValue.page = 1 // fix: if you are on page > 1, and you filter, it says no results
    p.modelValue[p.fieldName] = p.fieldType === 'choices' ? selectedChoices.value : query.value
    close()
}

function clearFilter() {
    p.modelValue[p.fieldName] = query.value = ''
    selectedChoices.value = []
    close()
}

function onClose() {
    if ((p.modelValue[p.fieldName] || query.value) && p.modelValue[p.fieldName] !== query.value) filter()
}

onMounted(() => {
    if (isFiltered.value) {
        query.value = p.modelValue[p.fieldName]
    }
})

watch(selectAllChoices, yes => {
    selectedChoices.value = yes ? p.options : []
})
</script>

<template>
    <UDropdown v-bind="$attrs" class="apm-filter" :auto-close="false" ref="ddEl" @closed="onClose">
        <a href="javascript:void(0)" class="all-center gap-1">
            <SortAscending v-if="isSorted && isAsc"/>
            <SortDescending v-if="isSorted && isDesc"/>
            <FilterIcon v-if="isFiltered"/>
            {{ fieldLabel }}
            <CaretDown/>
        </a>

        <template #content>
            <div class="py-2 af-menu">
                <UMenuItem @click="sort('asc')" :class="{'text-muted': isSorted && isAsc}">
                    <SortAscending/>
                    Sort Ascending
                </UMenuItem>
                <UMenuItem @click="sort('desc')" :class="{'text-muted': isSorted && isDesc}">
                    <SortDescending/>
                    Sort Descending
                </UMenuItem>
                <div class="all-center my-3 flex-column gap-2" v-if="!hideSearching">
                    <input
                        v-if="['text', 'number'].includes(fieldType)"
                        v-model="query"
                        class="search"
                        placeholder="search"
                        @keypress.enter="filter"
                    />
                    <USelect
                        v-if="fieldType === 'select' && options.length"
                        v-model="query"
                        :options="options"
                        :value-field="optionValueField"
                        :label-field="optionLabelField"
                        @update:modelValue="filter"
                    />
                    <div class="choices px-4" v-if="fieldType === 'choices'">
                        <hr class="mt-0">
                        <USwitch
                            class="mb-4"
                            label="Select all"
                            v-model="selectAllChoices"
                        />
                        <UChoices
                            v-model="selectedChoices"
                            :choices="options"
                            multiple
                        />
                        <UButton v-if="selectedChoices.length" @click="filter" class="my-4 w100" compact secondary>Apply
                            Filter
                        </UButton>
                    </div>
                    <a href="" v-if="isFiltered" @click.prevent="clearFilter">Clear filter</a>
                </div>
            </div>
        </template>
    </UDropdown>
</template>

<style lang="scss">
.apm-filter {
    .choices {
        .u-chip {
            width: 100%;
            height: 1.5rem;
        }
    }
}
</style>

<style scoped lang="scss">
.apm-filter {
    text-transform: initial;
    color: var(--main-text-color);

    .af-menu {
        min-width: 14em;
    }

    .search {
        border: var(--u-input-border-width) solid var(--u-input-border-color);
        border-radius: var(--form-element-border-radius);
        outline: none;
        padding: 0.5em;
        background-color: var(--bg);
        color: var(--main-text-color);

        &:focus {
            border-color: var(--u-input-color);
        }
    }
}
</style>
