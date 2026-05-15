<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Nova Matéria
      </q-btn>
    </div>

    <BaseDataTable
      v-model:filter="filter"
      title="Lista de Matérias"
      :subtitle="`${rows.length} matéria${rows.length !== 1 ? 's' : ''} cadastrada${rows.length !== 1 ? 's' : ''}`"
      :rows="filteredRows"
      :columns="columns"
      :loading="loading"
      search-placeholder="Buscar matérias..."
      empty-label="Nenhuma matéria cadastrada"
      @edit="openEdit"
      @delete="confirmDelete"
    />

    <CursoFormDialog
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
      title="Excluir Matéria"
      message="Deseja excluir a matéria "
      :highlight="pendingDelete?.nomeCurso"
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
import { computed, onMounted, ref, watch } from 'vue'
import BaseDataTable from 'src/components/base/BaseDataTable.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import CursoFormDialog from 'src/components/crud/CursoFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import cursoService from 'src/services/cursoService'

const filter = ref('')
let filtroTimeout = null

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
  service: cursoService,
  emptyForm: () => ({ nomeCurso: '' }),
  validate: (f) => {
    const e = {}
    if (!f.nomeCurso?.trim()) e.nomeCurso = 'Nome é obrigatório'
    return e
  },
  messages: {
    created: 'Matéria criada com sucesso!',
    updated: 'Matéria atualizada com sucesso!',
    deleted: 'Matéria excluída com sucesso!',
  },
  loadFn: () =>
    cursoService.findAll({
      nomeCurso: filter.value,
    }),
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  {
    name: 'nomeCurso',
    label: 'NOME DA MATÉRIA',
    field: 'nomeCurso',
    align: 'left',
    sortable: true,
  },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const filteredRows = computed(() => rows.value)

watch(filter, () => {
  clearTimeout(filtroTimeout)
  filtroTimeout = setTimeout(load, 350)
})

onMounted(load)
</script>
