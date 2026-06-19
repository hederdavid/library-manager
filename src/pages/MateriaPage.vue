<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Nova Matéria
      </q-btn>
    </div>

    <BaseDataTable
      v-model:filter="filter"
      title="Matérias"
      subtitle="Gerencie as matérias cadastradas no sistema"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      search-placeholder="Buscar matéria..."
      @edit="openEdit"
      @delete="confirmDelete"
    />

    <MateriaFormDialog
      v-model="dialogOpen"
      :editing-id="editingId"
      :form="form"
      :errors="errors"
      :saving="saving"
      @update:form="form = $event"
      @close="closeDialog"
      @save="save"
    />

    <ConfirmDialog
      v-model="confirmOpen"
      title="Excluir Matéria"
      message="Deseja excluir a matéria "
      :highlight="pendingDelete ? pendingDelete.nomeMateria : ''"
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
import { ref, watch, onMounted } from 'vue'
import { useCrud } from 'src/composables/useCrud'
import materiaService from 'src/services/materiaService'
import BaseDataTable from 'src/components/base/BaseDataTable.vue'
import MateriaFormDialog from 'src/components/crud/MateriaFormDialog.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'

const filter = ref('')
let filtroTimeout = null

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'nomeMateria',
    required: true,
    label: 'Nome da Matéria',
    align: 'left',
    field: 'nomeMateria',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Ações',
    align: 'right',
    field: 'actions',
    sortable: false,
  },
]

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
  service: materiaService,
  emptyForm: () => ({
    nomeMateria: '',
  }),
  validate: (formObj) => {
    const err = {}
    if (!formObj.nomeMateria || formObj.nomeMateria.length < 2) {
      err.nomeMateria = 'Nome deve ter no mínimo 2 caracteres'
    }
    return err
  },
  messages: {
    created: 'Matéria criada com sucesso!',
    updated: 'Matéria atualizada com sucesso!',
    deleted: 'Matéria excluída com sucesso!',
  },
  loadFn: async () => {
    return materiaService.getAll({ nome: filter.value })
  }
})

watch(
  filter,
  () => {
    clearTimeout(filtroTimeout)
    filtroTimeout = setTimeout(load, 350)
  }
)

onMounted(load)
</script>
