<script lang="ts" setup>

import ArrowDownLeftIcon from 'nvd-u/icons/ArrowDownLeft.vue'
import ArrowDownRightIcon from 'nvd-u/icons/ArrowDownRight.vue'
import ArrowTopLeftIcon from 'nvd-u/icons/ArrowTopLeft.vue'
import ArrowTopRightIcon from 'nvd-u/icons/ArrowTopRight.vue'
import { randomArrayItem } from 'nvd-js-helpers/misc'
import UDropdown from 'nvd-u/components/UDropdown.vue'
import UIconBtn from 'nvd-u/components/UIconBtn.vue'

const options = ['🍎', '🍐', '🍊', '🍋', '🍒', '🍑', '🍓', '🍅', '🍍']

</script>

<template>
    <div class="grid">
        <div>
            <UDropdown>
                <UIconBtn>
                    <ArrowDownRightIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div>
            <UDropdown left>
                <UIconBtn>
                    <ArrowDownLeftIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div>
            <UDropdown up>
                <UIconBtn>
                    <ArrowTopRightIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div>
            <UDropdown left up>
                <UIconBtn>
                    <ArrowTopLeftIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
    </div>
</template>

<style scoped lang="scss">

.grid {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: calc(100vh - 16rem);
}

</style>
