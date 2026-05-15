<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg dashboard-page">
    <div
      v-if="loading"
      class="row q-col-gutter-lg justify-center items-center dashboard-loading"
    >
      <q-spinner-dots color="primary" size="3rem" />
    </div>

    <template v-else>
      <MockDataBanner
        :show="mockConfig.usarMockDashboard"
        message="Dados demonstrativos: o backend ainda não possui API de dashboard."
      />
      <DashboardStats :stats="stats" />
      <DashboardCharts />
      <DashboardPending />
    </template>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dashboardService from 'src/services/dashboardService'
import { useNotify } from 'src/composables/useNotify'
import MockDataBanner from 'src/components/base/MockDataBanner.vue'
import DashboardStats from 'src/components/dashboard/DashboardStats.vue'
import DashboardCharts from 'src/components/dashboard/DashboardCharts.vue'
import DashboardPending from 'src/components/dashboard/DashboardPending.vue'
import { mockConfig } from 'src/services/mockConfig'

const notify = useNotify()
const loading = ref(true)
const stats = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    stats.value = await dashboardService.getStats()
  } catch (error) {
    notify.error(error, { fallbackMessage: 'Erro ao carregar os dados do dashboard.' })
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.dashboard-loading {
  min-height: 400px;
}
</style>
