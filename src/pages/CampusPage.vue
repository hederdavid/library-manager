<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Campus
      </q-btn>
    </div>

    <BaseDataTable
      v-model:filter="filter"
      title="Lista de Campus"
      :subtitle="`${rows.length} campus cadastrado${rows.length !== 1 ? 's' : ''}`"
      :rows="filteredRows"
      :columns="columns"
      :loading="loading"
      search-placeholder="Buscar campus..."
      empty-label="Nenhum campus cadastrado"
      @edit="openEdit"
      @delete="confirmDelete"
    />

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
      message="Deseja excluir o campus "
      :highlight="pendingDelete?.nome"
      details="? Esta ação não pode ser desfeita."
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
import BaseDataTable from 'src/components/base/BaseDataTable.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import CampusFormDialog from 'src/components/crud/CampusFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import campusService from 'src/services/campusService'

const filter = ref('')

const {
  loading,
  saving,
  deleting,
  rows,
  dialogOpen,
  editingId,
  errors,
  form,
  confirmOpen,
  pendingDelete,
  load,
  openCreate,
  openEdit,
  closeDialog,
  save,
  confirmDelete,
  handleDelete,
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
  return rows.value.filter(
    (r) => r.nome?.toLowerCase().includes(q) || r.cidade?.toLowerCase().includes(q),
  )
})

onMounted(load)
</script>
