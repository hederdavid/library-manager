<template>
  <q-page padding class="q-pa-xl dashboard-page">
    <div class="header-row q-mb-xl">
      <div class="header-title">
        <h1 class="text-h4 text-weight-bold text-main q-ma-none">Dashboard</h1>
        <p class="text-subtitle2 text-muted q-mt-xs q-mb-none">
          Visão geral do sistema de empréstimos
        </p>
      </div>

      <div class="header-actions">
        <q-btn round flat class="notification-btn bg-white shadow-1">
          <q-icon name="notifications_none" color="grey-8" />
          <q-badge color="negative" floating rounded class="notification-dot"></q-badge>
        </q-btn>
      </div>
    </div>

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

<style lang="scss" scoped>

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 24px;
}

.header-title h1 {
  font-size: 24px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
  color: $text-muted;
  transition: all 0.2s ease;

  &:hover {
    background: $bg-input !important;
    color: $primary;
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08) !important;
  }
}

.notification-dot {
  width: 9px;
  height: 10px;
  border: 2px solid white;
  padding: 0;
  top: 10px;
  right: 10px;
}
</style>
