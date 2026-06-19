<template>
  <div class="q-pa-md">
    <div class="row items-center q-col-gutter-md q-mb-lg">
      <div class="col">
        <q-input
          v-model="loansStore.historySearch"
          outlined
          dense
          placeholder="Buscar por aluno, matrícula ou livro..."
          bg-color="white"
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-6" />
          </template>
        </q-input>
      </div>
      <div class="col-auto">
        <q-select
          outlined
          dense
          v-model="loansStore.statusFilter"
          :options="statusOptions"
          emit-value
          map-options
          bg-color="white"
          class="status-filter"
        />
      </div>
    </div>

    <q-table
      flat
      bordered
      :rows="loansStore.filteredHistoryRows"
      :columns="loansStore.historyColumns"
      row-key="id"
      class="history-table"
      :pagination="{ rowsPerPage: 10 }"
      no-data-label="Nenhum empréstimo encontrado"
      :loading="loansStore.loading"
    >
      <template v-slot:body-cell-condEntrega="props">
        <q-td :props="props">
          <span class="condition-tag" :class="`condition-tag--${conditionClass(props.value)}`">
            {{ conditionLabel(props.value) }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-condDevolucao="props">
        <q-td :props="props">
          <span
            v-if="props.value"
            class="condition-tag"
            :class="`condition-tag--${conditionClass(props.value)}`"
          >
            {{ conditionLabel(props.value) }}
          </span>
          <span v-else class="text-muted">-</span>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge unelevated class="status-badge" :class="`status--${props.value?.toLowerCase()}`">
            <q-icon :name="statusIcon(props.value)" size="12px" class="q-mr-xs" />
            {{ statusLabel(props.value) }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-student="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.alunoNome }}</div>
          <div class="text-caption text-muted">{{ props.row.alunoMatricula }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-book="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.livroTitulo }}</div>
          <div class="text-caption text-muted">{{ props.row.livroDisciplina }}</div>
        </q-td>
      </template>
      
      <template v-slot:body-cell-returnDate="props">
        <q-td :props="props">
          {{ props.value || '-' }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useLoansStore } from 'src/stores/loansStore'

const loansStore = useLoansStore()

const statusOptions = [
  { label: 'Todos os status', value: null },
  { label: 'Ativo', value: 'EMPRESTADO' },
  { label: 'Devolvido', value: 'DEVOLVIDO' },
  { label: 'Atrasado', value: 'ATRASADO' },
]

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
    DEVOLVIDO: 'Devolvido',
    ATRASADO: 'Atrasado',
    CANCELADO: 'Cancelado',
  }
  return map[value] || value || '-'
}

function statusIcon(value) {
  const map = {
    EMPRESTADO: 'schedule',
    DEVOLVIDO: 'check_circle',
    ATRASADO: 'report_problem',
    CANCELADO: 'cancel',
  }
  return map[value] || 'help_outline'
}
</script>

<style lang="scss" scoped>
.history-table {
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

.status-filter {
  min-width: 160px;
}

.condition-tag {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
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

  &.status--devolvido {
    color: $tag-green-text;
    background: $tag-green-bg;
  }
  &.status--emprestado {
    color: $tag-blue-text;
    background: $tag-blue-bg;
  }
  &.status--atrasado {
    color: $tag-red-text;
    background: $tag-red-bg;
  }
  &.status--cancelado {
    color: $text-muted;
    background: $border-input;
  }
}
</style>
