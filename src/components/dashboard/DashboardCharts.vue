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
</template>

<script setup>
import { ref } from 'vue'

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

.legend-value {
  color: $text-main;
}
</style>
