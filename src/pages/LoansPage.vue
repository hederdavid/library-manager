<template>
  <q-page padding class="q-pa-xl loans-page">
    <div class="header-row q-mb-xl">
      <div class="header-title">
        <h1 class="text-h4 text-weight-bold text-main q-ma-none">Empréstimos e Devoluções</h1>
        <p class="text-subtitle2 text-muted q-mt-xs q-mb-none">Controle de empréstimos de livros</p>
      </div>

      <div class="header-actions flex items-center gap-md">
        <q-input
          outlined
          dense
          placeholder="Busca rápida..."
          class="top-search-input bg-white"
          rounded
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-5" />
          </template>
        </q-input>

        <q-btn round flat class="notification-btn bg-white shadow-1 text-grey-7">
          <q-icon name="notifications_none" size="20px" />
          <q-badge color="negative" floating rounded class="notification-dot"></q-badge>
        </q-btn>

        <q-avatar
          size="44px"
          font-size="16px"
          color="primary"
          text-color="white"
          class="admin-avatar-top text-weight-bold"
        >
          AD
        </q-avatar>
      </div>
    </div>

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
        align="left"
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

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h1 {
  font-size: 24px;
}

.notification-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
  color: #64748b;
}

.notification-dot {
  width: 9px;
  height: 9px;
  border: 2px solid white;
  top: 10px;
  right: 10px;
}

.top-search-input {
  width: 250px;
  :deep(.q-field__control) {
    border-radius: 20px;
    height: 40px;
  }
}

.admin-avatar-top {
  background-color: $primary !important;
}

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
}

.tab-item {
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
