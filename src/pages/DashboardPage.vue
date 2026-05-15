<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg dashboard-page">
    <div
      v-if="loading"
      class="row q-col-gutter-lg justify-center items-center"
      style="min-height: 400px"
    >
      <q-spinner-dots color="primary" size="3rem" />
    </div>

    <template v-else>
      <DashboardStats :stats="stats" />
      <DashboardCharts />
      <DashboardPending />
    </template>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dashboardService from 'src/services/dashboardService'
import { useQuasar } from 'quasar'
import DashboardStats from 'src/components/dashboard/DashboardStats.vue'
import DashboardCharts from 'src/components/dashboard/DashboardCharts.vue'
import DashboardPending from 'src/components/dashboard/DashboardPending.vue'

const $q = useQuasar()
const loading = ref(true)
const stats = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    stats.value = await dashboardService.getStats()
  } catch (error) {
    let msg = error?.message || error
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar os dados do dashboard: ' + msg,
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
})
</script>
