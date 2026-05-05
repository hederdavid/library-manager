<template>
  <div class="q-pa-md">
    <div class="row items-center q-col-gutter-md q-mb-lg">
      <div class="col">
        <q-input
          outlined
          dense
          placeholder="Buscar por aluno, matrícula, livro ou código..."
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
          :options="['Todos os status', 'Ativo', 'Devolvido', 'Atrasado']"
          bg-color="white"
          style="min-width: 150px"
        />
      </div>
    </div>

    <q-table
      flat
      bordered
      :rows="loansStore.historyRows"
      :columns="loansStore.historyColumns"
      row-key="id"
      class="history-table"
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:body-cell-condition="props">
        <q-td :props="props">
          <div class="flex items-center gap-xs">
            <q-icon
              name="north"
              size="12px"
              color="positive"
              v-if="props.value === 'Novo'"
            />
            <span class="condition-tag" :class="`tag--${props.value.toLowerCase()}`">{{
              props.value
            }}</span>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            unelevated
            class="status-badge"
            :class="`status--${props.value.toLowerCase()}`"
          >
            <q-icon
              :name="
                props.value === 'Atrasado'
                  ? 'report_problem'
                  : props.value === 'Ativo'
                    ? 'schedule'
                    : 'check_circle'
              "
              size="12px"
              class="q-mr-xs"
            />
            {{ props.value }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-student="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.studentName }}</div>
          <div class="text-caption text-muted">{{ props.row.studentId }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-book="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.bookTitle }}</div>
          <div class="text-caption text-muted">{{ props.row.bookCode }}</div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useLoansStore } from 'src/stores/loansStore'

const loansStore = useLoansStore()
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

.condition-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;

  &.tag--novo {
    color: $tag-green-text;
    background: $tag-green-bg;
  }
  &.tag--bom {
    color: $tag-blue-text;
    background: $tag-blue-bg;
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
  &.status--ativo {
    color: $tag-blue-text;
    background: $tag-blue-bg;
  }
  &.status--atrasado {
    color: $tag-red-text;
    background: $tag-red-bg;
  }
}
</style>
