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
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-6 col-md-3">
          <StatCard
            title="Total de Livros"
            :value="stats?.totalBooks?.value || 14"
            changeText="+3 este mês"
            changeIcon="trending_up"
            description="8 disponíveis"
            icon="menu_book"
            theme="green"
          />
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <StatCard
            title="Empréstimos Ativos"
            :value="stats?.activeLoans?.value || 6"
            changeText="+5 esta semana"
            changeIcon="trending_up"
            description="de 12 alunos cadastrados"
            icon="swap_horiz"
            theme="blue"
          />
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <StatCard
            title="Devoluções Atrasadas"
            :value="stats?.overdueReturns?.value || 5"
            changeText="Crítico"
            changeIcon="warning"
            description="requerem atenção imediata"
            icon="report_problem"
            theme="red"
          />
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <StatCard
            title="Alunos c/ Pendência"
            :value="stats?.pendingStudents?.value || 5"
            changeText="Verificar"
            changeIcon="warning"
            description="de 12 alunos"
            icon="people"
            theme="orange"
          />
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-8">
          <q-card flat bordered class="chart-card">
            <q-card-section class="chart-header">
              <div>
                <div class="text-h6 text-weight-bold text-main">Movimentação Mensal</div>
                <div class="text-caption text-muted">Empréstimos e devoluções</div>
              </div>
              <div class="chart-legend">
                <span class="legend-dot bg-primary"></span>
                <span class="legend-text">Empréstimos</span>
                <span class="legend-dot bg-accent q-ml-sm"></span>
                <span class="legend-text">Devoluções</span>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <apexchart type="area" height="280" :options="areaOptions" :series="areaSeries" />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card flat bordered class="chart-card">
            <q-card-section>
              <div class="text-h6 text-weight-bold text-main">Condição do Acervo</div>
              <div class="text-caption text-muted">Estado atual dos livros</div>
            </q-card-section>

            <q-card-section class="q-pt-none flex flex-center">
              <apexchart type="donut" width="100%" :options="donutOptions" :series="donutSeries" />
            </q-card-section>

            <q-card-section class="custom-donut-legend">
              <div class="legend-row">
                <div class="legend-label">
                  <span class="dot" style="background: #397b4f"></span> Novo
                </div>
                <div class="legend-value text-weight-bold">3</div>
              </div>
              <div class="legend-row">
                <div class="legend-label">
                  <span class="dot" style="background: #4caf50"></span> Bom
                </div>
                <div class="legend-value text-weight-bold">7</div>
              </div>
              <div class="legend-row">
                <div class="legend-label">
                  <span class="dot" style="background: #ff9800"></span> Regular
                </div>
                <div class="legend-value text-weight-bold">3</div>
              </div>
              <div class="legend-row">
                <div class="legend-label">
                  <span class="dot" style="background: #f44336"></span> Ruim
                </div>
                <div class="legend-value text-weight-bold">1</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-7">
          <q-card flat bordered class="list-card">
            <q-card-section class="list-header">
              <div class="flex items-center gap-sm">
                <div class="header-icon-box bg-red-1">
                  <q-icon name="report_problem" color="negative" size="20px" />
                </div>
                <div>
                  <div class="text-subtitle1 text-weight-bold text-main">Empréstimos Atrasados</div>
                  <div class="text-caption text-muted">Ação necessária</div>
                </div>
              </div>
              <q-badge
                unelevated
                class="header-badge"
                style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca"
              >
                5 atrasos
              </q-badge>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-list class="custom-list">
                <q-item v-for="i in 3" :key="i" class="list-item">
                  <q-item-section avatar>
                    <div class="days-badge bg-red-1 text-negative">13d</div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold text-main list-item-title"
                      >Maria Fernanda Santos</q-item-label
                    >
                    <q-item-label caption class="text-muted"
                      >Algoritmos: Teoria e Prática</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side class="items-end">
                    <q-item-label class="text-weight-bold text-negative opacity-80"
                      >13 dias atraso</q-item-label
                    >
                    <q-item-label caption>Venceu: 10/03</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-5">
          <q-card flat bordered class="list-card">
            <q-card-section class="list-header">
              <div class="flex items-center gap-sm">
                <div class="header-icon-box bg-green-1">
                  <q-icon name="calendar_today" color="primary" size="20px" />
                </div>
                <div>
                  <div class="text-subtitle1 text-weight-bold text-main">Próximas Devoluções</div>
                  <div class="text-caption text-muted">Próximos 10 dias</div>
                </div>
              </div>
              <q-badge
                unelevated
                class="header-badge"
                style="background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0"
              >
                1 devol.
              </q-badge>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-list class="custom-list">
                <q-item class="list-item">
                  <q-item-section avatar>
                    <div class="days-badge bg-green-1 text-primary">8d</div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold text-main list-item-title"
                      >João Pedro Silva</q-item-label
                    >
                    <q-item-label caption class="text-muted text-ellipsis" style="max-width: 180px"
                      >Programação Orientada a Objetos - INF-013</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side class="items-end">
                    <q-item-label caption class="text-weight-bold text-primary">01/04</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StatCard from 'src/components/StatCard.vue'
import { dashboardService } from 'src/services/dashboardService'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const loading = ref(true)
const stats = ref(null)

const areaOptions = ref({
  chart: {
    fontFamily: 'Inter, sans-serif',
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#397b4f'],
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0, stops: [0, 90, 100] },
  },
  xaxis: {
    categories: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 0,
    max: 60,
    tickAmount: 4,
  },
  grid: {
    strokeDashArray: 4,
    borderColor: '#f1f5f9',
  },
})

const areaSeries = ref([{ name: 'Empréstimos', data: [28, 35, 18, 42, 38, 45] }])

const donutOptions = ref({
  chart: {
    fontFamily: 'Inter, sans-serif',
    type: 'donut',
  },
  labels: ['Novo', 'Bom', 'Regular', 'Ruim'],
  colors: ['#397b4f', '#4caf50', '#ff9800', '#f44336'],
  dataLabels: { enabled: false },
  legend: { show: false },
  stroke: { width: 2, colors: ['#fff'] },
  plotOptions: {
    pie: {
      donut: { size: '70%' },
      expandOnClick: false,
    },
  },
})

const donutSeries = ref([3, 7, 3, 1])

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
.dashboard-page {
  background-color: $bg-input;
  min-height: 100vh;
}

.text-main {
  color: $text-main;
}

.text-muted {
  color: $text-muted;
}

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

.chart-card,
.list-card {
  background: white;
  border-radius: 20px;
  border: 1px solid $border;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.chart-header,
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
}

.header-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-legend {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: $text-muted;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}

.custom-donut-legend {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 32px 32px 32px;
}

.legend-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.legend-label {
  display: flex;
  align-items: center;
  color: $text-muted;
  font-weight: 500;
}

.legend-label .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 12px;
}

.legend-value {
  color: $text-main;
}

.header-badge {
  font-weight: 700;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
}

.custom-list {
  padding: 0 16px 16px 16px;
}

.list-item {
  padding: 20px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: $bg-input;
  }
}

.days-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

.list-item-title {
  font-size: 15px;
  color: $text-main;
}

.opacity-80 {
  opacity: 0.8;
}

.gap-sm {
  gap: 16px;
}
</style>
