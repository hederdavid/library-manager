<template>
  <div class="lib-card">
    <div class="table-toolbar q-px-lg q-py-md">
      <div class="table-toolbar__main-row">
        <div>
          <h2 class="text-h6 text-weight-bold text-main q-ma-none">{{ title }}</h2>
          <p v-if="subtitle" class="text-caption text-muted q-mt-xs q-mb-none">{{ subtitle }}</p>
        </div>

        <q-input
          v-if="showSearch"
          :model-value="filter"
          outlined
          dense
          :placeholder="searchPlaceholder"
          class="table-search-input bg-white"
          rounded
          @update:model-value="$emit('update:filter', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-5" />
          </template>
        </q-input>
      </div>

      <div v-if="$slots.filters" class="table-toolbar__filters">
        <slot name="filters" />
      </div>
    </div>

    <q-separator />

    <q-table
      flat
      :rows="rows"
      :columns="columns"
      :row-key="rowKey"
      :loading="loading"
      class="lib-table"
      :pagination="pagination"
      :no-data-label="emptyLabel"
    >
      <template v-for="slotName in forwardedSlotNames" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="edit"
            color="primary"
            size="sm"
            @click="$emit('edit', props.row)"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
          <q-btn
            flat
            dense
            round
            icon="delete_outline"
            color="negative"
            size="sm"
            class="q-ml-xs"
            @click="$emit('delete', props.row)"
          >
            <q-tooltip>Excluir</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center text-muted q-gutter-sm q-pa-lg">
          <q-icon name="inbox" size="20px" />
          <span>{{ emptyLabel }}</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' },
  loading: { type: Boolean, default: false },
  filter: { type: String, default: '' },
  searchPlaceholder: { type: String, default: 'Buscar...' },
  emptyLabel: { type: String, default: 'Nenhum registro encontrado' },
  showSearch: { type: Boolean, default: true },
  pagination: { type: Object, default: () => ({ rowsPerPage: 10 }) },
})

defineEmits(['update:filter', 'edit', 'delete'])

const slots = useSlots()
const forwardedSlotNames = computed(() =>
  Object.keys(slots).filter((slotName) => slotName !== 'filters'),
)
</script>
