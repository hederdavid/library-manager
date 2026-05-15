<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg loans-page">
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <StatCardMini title="Ativos" value="6" icon="schedule" theme="blue" />
      </div>
      <div class="col-12 col-md-4">
        <StatCardMini title="Atrasados" value="5" icon="report_problem" theme="red" />
      </div>
      <div class="col-12 col-md-4">
        <StatCardMini title="Devolvidos" value="4" icon="check_circle_outline" theme="green" />
      </div>
    </div>

    <div class="loans-content-card">
      <q-tabs
        v-model="loansStore.tab"
        dense
        class="text-grey-7 custom-tabs"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="new" label="Nova Entrega" icon="add" class="tab-item custom-tab" />
        <q-tab name="return" class="tab-item custom-tab">
          <div class="flex items-center gap-sm">
            <q-icon name="sync" size="20px" />
            <span class="text-weight-bold tab-label-text">Devolução</span>
            <q-badge color="red-1" text-color="negative" class="tab-badge">5</q-badge>
          </div>
        </q-tab>
        <q-tab name="history" class="tab-item custom-tab">
          <div class="flex items-center gap-sm">
            <q-icon name="text_snippet" size="20px" />
            <span class="text-weight-bold tab-label-text">Histórico</span>
            <q-badge color="grey-2" text-color="grey-7" class="tab-badge">10</q-badge>
          </div>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="loansStore.tab" animated class="bg-transparent">
        <q-tab-panel name="new" class="tab-panel-content">
          <LoanNewTab />
        </q-tab-panel>

        <q-tab-panel name="return" class="tab-panel-content">
          <LoanReturnTab />
        </q-tab-panel>

        <q-tab-panel name="history" class="q-pa-none">
          <LoanHistoryTab />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import StatCardMini from 'src/components/StatCardMini.vue'
import LoanNewTab from 'src/components/loans/LoanNewTab.vue'
import LoanReturnTab from 'src/components/loans/LoanReturnTab.vue'
import LoanHistoryTab from 'src/components/loans/LoanHistoryTab.vue'
import { useLoansStore } from 'src/stores/loansStore'

const loansStore = useLoansStore()
</script>

<style lang="scss" scoped>

.loans-content-card {
  background: white;
  border-radius: 20px;
  border: 1px solid $border;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.custom-tabs {
  padding: 0 24px;
  background: $bg-input;

  :deep(.q-tabs__content) {
    width: 100%;
  }
}

.tab-item {
  flex: 1 1 0;
  min-height: 64px;
  padding: 0 24px;
  font-weight: 600;
  text-transform: none;
}

.custom-tab {
  &.q-tab--active {
    color: $primary !important;
  }
}

.tab-label-text {
  font-size: 14px;
  margin-left: 6px;
}

.tab-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
}

.tab-panel-content {
  padding: 48px;
}
</style>
