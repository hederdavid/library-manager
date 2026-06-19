<template>
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
          <div class="legend-row" v-for="(item, index) in stats?.conditionStats" :key="index">
            <div class="legend-label">
              <span class="dot" :class="getColorClass(item.label)"></span> {{ item.label }}
            </div>
            <div class="legend-value text-weight-bold">{{ item.value }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stats: Object,
})

function getColorClass(label) {
  const map = {
    Novo: 'dot--novo',
    Conservado: 'dot--bom',
    'Mal Conservado': 'dot--regular',
    Inutilizado: 'dot--ruim',
  }
  return map[label] || 'dot--novo'
}

const areaOptions = computed(() => {
  const categories = props.stats?.monthlyMovement?.map((m) => m.month) || []
  return {
    chart: {
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#397b4f', '#81c784'],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0, stops: [0, 90, 100] },
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
    grid: {
      strokeDashArray: 4,
      borderColor: '#f1f5f9',
    },
  }
})

const areaSeries = computed(() => {
  const loans = props.stats?.monthlyMovement?.map((m) => m.loans) || []
  const returns = props.stats?.monthlyMovement?.map((m) => m.returns) || []

  return [
    { name: 'Empréstimos', data: loans },
    { name: 'Devoluções', data: returns },
  ]
})

const donutOptions = computed(() => {
  const labels = props.stats?.conditionStats?.map((c) => c.label) || []
  return {
    chart: {
      fontFamily: 'Inter, sans-serif',
      type: 'donut',
    },
    labels: labels,
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
  }
})

const donutSeries = computed(() => {
  return props.stats?.conditionStats?.map((c) => c.value) || []
})
</script>

<style lang="scss" scoped>
.chart-card {
  background: white;
  border-radius: 20px;
  border: 1px solid $border;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
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

.dot--novo {
  background: #397b4f;
}

.dot--bom {
  background: #4caf50;
}

.dot--regular {
  background: #ff9800;
}

.dot--ruim {
  background: #f44336;
}

.legend-value {
  color: $text-main;
}
</style>
