<script setup lang="ts">
import BarChart from 'src/components/common/charts/BarChart.vue'
import { useDashboardStore } from 'src/stores/dashboard.store'
import ActivitiesWidget from 'src/views/dashboard/ActivitiesWidget.vue'
import DashboardCard from 'src/views/dashboard/DashboardCard.vue'
import WidgetHeader from 'src/views/dashboard/WidgetHeader.vue'
import { computed, onMounted } from 'vue'

let db = useDashboardStore()

let data = computed(() => ({
    datasets: db.dailyChartReq.data,
}))

onMounted(() => {
    if (!db.dailyChartReq.hasLoadedData) db.dailyChartReq.send()
    if (!db.cardsReq.hasLoadedData) db.cardsReq.send()
    if (!db.activitiesReq.data.all) db.activitiesReq.send()
    if (!db.canvasActivitiesReq.data.all) db.canvasActivitiesReq.send()
})

</script>

<template>
    <div>
        <div class="dashboard-cards d-flex flex-wrap">
            <DashboardCard
                v-for="(data, label) in db.cardsReq.data"
                :data="data"
                :heading="label"
            />
        </div>
        <div class="d-flex flex-grow-1 flex-wrap widgets">
            <div class="card p-4 d-flex flex-column">
                <WidgetHeader
                    title="Daily Activities"
                    :req="db.dailyChartReq"
                />
                <BarChart
                    v-if="db.dailyChartReq.loaded"
                    :data="data"
                    x-axis-key="date"
                    y-axis-key="count"/>
            </div>
            <div class="card p-4 d-flex flex-column">
                <WidgetHeader
                    title="User Activities"
                    :req="db.activitiesReq"
                />
                <div class="grid col-2 gap-4 text-center w100">
                    <ActivitiesWidget
                        title="All Time"
                        :data="db.activitiesReq.data.all"
                        v-if="db.activitiesReq.data.all"
                    />
                    <ActivitiesWidget
                        title="Last 2 Weeks"
                        :data="db.activitiesReq.data.recent"
                        v-if="db.activitiesReq.data.recent"
                    />
                </div>
            </div>
            <div class="card p-4 d-flex flex-column">
                <WidgetHeader
                    title="Canvas Activities"
                    :req="db.canvasActivitiesReq"
                />
                <div class="grid col-2 gap-4 text-center w100">
                    <ActivitiesWidget
                        title="All Time"
                        :data="db.canvasActivitiesReq.data.all"
                        v-if="db.canvasActivitiesReq.data.all"
                    />
                    <ActivitiesWidget
                        title="Last 2 Weeks"
                        :data="db.canvasActivitiesReq.data.recent"
                        v-if="db.canvasActivitiesReq.data.recent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-cards {
    gap: 1em;
    padding: 1em;

    .dashboard-card {
        width: calc(20% - 0.8em);

        @media (max-width: 850px) {
            & {
                width: calc(50% - 0.5em);
            }
        }
    }
}

.widgets {
    gap: 1em;
    padding: 1em 1em 5em 1em;

    & > .card {
        width: calc(50% - 0.5em);
        margin: 0;

        &:first-child {
            width: 100%;
        }

        @media (max-width: 850px) {
            & {
                width: 100%;
            }
        }
    }
}
</style>
