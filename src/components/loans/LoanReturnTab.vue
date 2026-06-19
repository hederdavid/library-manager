<template>
  <div class="return-container">
    <div class="form-header">
      <h2 class="text-h6 text-weight-bold text-primary q-ma-none">
        <q-icon name="sync" class="q-mr-sm" /> Devoluções Pendentes
      </h2>
      <p class="text-caption text-muted q-mt-xs q-mb-none">
        Selecione o empréstimo para registrar a devolução
      </p>
    </div>

    <div v-if="loansStore.loading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="primary" size="2rem" />
    </div>

    <div v-else-if="loansStore.emprestimosPendentes.length === 0" class="empty-state q-mt-xl">
      <q-icon name="check_circle_outline" size="48px" color="positive" />
      <p class="text-body1 text-weight-bold text-main q-mt-md q-mb-xs">Tudo em dia!</p>
      <p class="text-caption text-muted">Não há empréstimos pendentes de devolução.</p>
    </div>

    <q-table
      v-else
      flat
      bordered
      :rows="loansStore.emprestimosPendentes"
      :columns="pendingColumns"
      row-key="id"
      class="pending-table q-mt-lg"
      :pagination="{ rowsPerPage: 10 }"
      no-data-label="Nenhum empréstimo pendente"
    >
      <template v-slot:body-cell-aluno="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.alunoNome }}</div>
          <div class="text-caption text-muted">{{ props.row.alunoMatricula }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-livro="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.livroTitulo }}</div>
          <div class="text-caption text-muted">{{ props.row.livroDisciplina }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-condicaoEntrega="props">
        <q-td :props="props">
          <span class="condition-tag" :class="`condition-tag--${conditionClass(props.value)}`">
            {{ conditionLabel(props.value) }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge unelevated class="status-badge" :class="`status--${props.value.toLowerCase()}`">
            <q-icon
              :name="props.value === 'ATRASADO' ? 'report_problem' : 'schedule'"
              size="12px"
              class="q-mr-xs"
            />
            {{ statusLabel(props.value) }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            unelevated
            color="primary"
            size="sm"
            label="Devolver"
            icon="keyboard_return"
            class="return-btn"
            @click="loansStore.abrirDevolucao(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Dialog de Devolução -->
    <BaseFormDialog
      v-model="loansStore.devolucaoDialog"
      title="Registrar Devolução"
      :subtitle="devolucaoSubtitle"
      submit-label="Confirmar Devolução"
      :saving="loansStore.devolvendo"
      :width="480"
      @close="loansStore.devolucaoDialog = false"
      @save="loansStore.confirmarDevolucao()"
    >
      <div class="q-mb-md">
        <label class="lib-form-label">Condição do livro na devolução *</label>
        <div class="condition-toggle-row">
          <q-btn-toggle
            v-model="loansStore.condicaoDevolucao"
            toggle-color="primary"
            text-color="grey-7"
            unelevated
            flat
            padding="8px 20px"
            class="custom-toggle"
            :options="condicaoOptions"
          />
        </div>
      </div>
    </BaseFormDialog>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLoansStore } from 'src/stores/loansStore'
import BaseFormDialog from 'src/components/base/BaseFormDialog.vue'

const loansStore = useLoansStore()

const condicaoOptions = [
  { label: 'Novo', value: 'NOVO' },
  { label: 'Conservado', value: 'CONSERVADO' },
  { label: 'Mal Conservado', value: 'MAL_CONSERVADO' },
  { label: 'Inutilizado', value: 'INUTILIZADO' },
]

const pendingColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'aluno', label: 'ALUNO', field: 'alunoNome', align: 'left', sortable: true },
  { name: 'livro', label: 'LIVRO', field: 'livroTitulo', align: 'left', sortable: true },
  { name: 'outDate', label: 'SAÍDA', field: 'dataEntrega', align: 'left', sortable: true },
  {
    name: 'condicaoEntrega',
    label: 'CONDIÇÃO',
    field: 'condicaoEntrega',
    align: 'left',
  },
  { name: 'status', label: 'STATUS', field: 'statusEmprestimo', align: 'left' },
  { name: 'actions', label: '', field: 'actions', align: 'center' },
]

const devolucaoSubtitle = computed(() => {
  const e = loansStore.emprestimoParaDevolver
  if (!e) return ''
  return `${e.livroTitulo} — ${e.alunoNome}`
})

function conditionLabel(value) {
  const map = {
    NOVO: 'Novo',
    CONSERVADO: 'Conservado',
    MAL_CONSERVADO: 'Mal Conservado',
    INUTILIZADO: 'Inutilizado',
  }
  return map[value] || value || '-'
}

function conditionClass(value) {
  const map = {
    NOVO: 'novo',
    CONSERVADO: 'conservado',
    MAL_CONSERVADO: 'mal-conservado',
    INUTILIZADO: 'inutilizado',
  }
  return map[value] || ''
}

function statusLabel(value) {
  const map = {
    EMPRESTADO: 'Ativo',
    ATRASADO: 'Atrasado',
  }
  return map[value] || value
}
</script>

<style lang="scss" scoped>
.form-header {
  margin-bottom: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
}

.pending-table {
  :deep(thead tr th) {
    font-weight: 700;
    color: $text-muted;
    background: $bg-input;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  :deep(tbody tr td) {
    padding: 16px;
  }
}

.return-btn {
  border-radius: 8px;
  font-weight: 600;
  text-transform: none;
}

.condition-tag {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;

  &--novo {
    color: $tag-green-text;
    background: $tag-green-bg;
  }
  &--conservado {
    color: $tag-blue-text;
    background: $tag-blue-bg;
  }
  &--mal-conservado {
    color: $badge-orange-text;
    background: $badge-orange-bg;
  }
  &--inutilizado {
    color: $tag-red-text;
    background: $tag-red-bg;
  }
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 11px;

  &.status--emprestado {
    color: $tag-blue-text;
    background: $tag-blue-bg;
  }
  &.status--atrasado {
    color: $tag-red-text;
    background: $tag-red-bg;
  }
}

.condition-toggle-row {
  background: $bg-input;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid $border-input;
  display: inline-flex;
}

.custom-toggle {
  :deep(.q-btn) {
    border-radius: 8px !important;
    font-size: 13px;
    font-weight: 600;
  }
}
</style>
