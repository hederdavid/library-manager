<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Campus
      </q-btn>
    </div>

    <div class="lib-card">
      <div class="table-toolbar q-px-lg q-py-md">
        <div class="table-toolbar__main-row">
          <div>
            <h2 class="text-h6 text-weight-bold text-main q-ma-none">Lista de Campus</h2>
            <p class="text-caption text-muted q-mt-xs q-mb-none">
              {{ rows.length }} campus cadastrado{{ rows.length !== 1 ? 's' : '' }}
            </p>
          </div>
          <q-input
            v-model="filter"
            outlined
            dense
            placeholder="Buscar campus..."
            class="table-search-input bg-white"
            rounded
          >
            <template v-slot:prepend>
              <q-icon name="search" size="20px" color="grey-5" />
            </template>
          </q-input>
        </div>
      </div>

      <q-separator />

      <q-table
        flat
        :rows="filteredRows"
        :columns="columns"
        row-key="id"
        :loading="loading"
        class="lib-table"
        :pagination="{ rowsPerPage: 10 }"
        no-data-label="Nenhum campus cadastrado"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat dense round icon="edit" color="primary" size="sm" @click="openEdit(props.row)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn flat dense round icon="delete_outline" color="negative" size="sm" class="q-ml-xs" @click="confirmDelete(props.row)">
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>

    <CampusFormDialog
      v-model="dialogOpen"
      :editing-id="editingId"
      v-model:form="form"
      :errors="errors"
      :saving="saving"
      @close="closeDialog"
      @save="save"
    />

    <ConfirmDialog
      v-model="confirmOpen"
      title="Excluir Campus"
      :message="`Deseja excluir o campus <strong>${pendingDelete?.nome}</strong>? Esta ação não pode ser desfeita.`"
      icon="delete_outline"
      icon-theme="red"
      confirm-label="Excluir"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import CampusFormDialog from 'src/components/crud/CampusFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import campusService from 'src/services/campusService'

const filter = ref('')

const {
  loading, saving, deleting, rows, dialogOpen, editingId, errors, form,
  confirmOpen, pendingDelete, load, openCreate, openEdit, closeDialog, save, confirmDelete, handleDelete,
} = useCrud({
  service: campusService,
  emptyForm: () => ({ nome: '', cidade: '' }),
  validate: (f) => {
    const e = {}
    if (!f.nome?.trim()) e.nome = 'Nome é obrigatório'
    if (!f.cidade?.trim()) e.cidade = 'Cidade é obrigatória'
    return e
  },
  messages: {
    created: 'Campus criado com sucesso!',
    updated: 'Campus atualizado com sucesso!',
    deleted: 'Campus excluído com sucesso!',
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'nome', label: 'NOME', field: 'nome', align: 'left', sortable: true },
  { name: 'cidade', label: 'CIDADE', field: 'cidade', align: 'left', sortable: true },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const filteredRows = computed(() => {
  if (!filter.value.trim()) return rows.value
  const q = filter.value.toLowerCase()
  return rows.value.filter((r) => r.nome?.toLowerCase().includes(q) || r.cidade?.toLowerCase().includes(q))
})

onMounted(load)
</script>
