<template>
  <q-page padding class="q-pa-xl lib-page">
    <PageHeader title="Matérias" subtitle="Gerenciamento de cursos e matérias" v-model="filter" />

    <div class="lib-card">
      <div class="row justify-between items-center q-px-lg q-py-md">
        <div>
          <h2 class="text-h6 text-weight-bold text-main q-ma-none">Lista de Matérias</h2>
          <p class="text-caption text-muted q-mt-xs q-mb-none">
            {{ rows.length }} matéria{{ rows.length !== 1 ? 's' : '' }} cadastrada{{ rows.length !== 1 ? 's' : '' }}
          </p>
        </div>
        <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
          <q-icon name="add" size="18px" class="q-mr-sm" />Nova Matéria
        </q-btn>
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
        no-data-label="Nenhuma matéria cadastrada"
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
      :message="`Deseja excluir a matéria <strong>${pendingDelete?.nome_curso}</strong>? Esta ação não pode ser desfeita.`"
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
import PageHeader from 'src/components/PageHeader.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import CursoFormDialog from 'src/components/crud/CursoFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import cursoService from 'src/services/cursoService'

const filter = ref('')

const {
  loading, saving, deleting, rows, dialogOpen, editingId, errors, form,
  confirmOpen, pendingDelete, load, openCreate, openEdit, closeDialog, save, confirmDelete, handleDelete,
} = useCrud({
  service: cursoService,
  emptyForm: () => ({ nome_curso: '' }),
  validate: (f) => {
    const e = {}
    if (!f.nome_curso?.trim()) e.nome_curso = 'Nome é obrigatório'
    return e
  },
  messages: {
    created: 'Matéria criada com sucesso!',
    updated: 'Matéria atualizada com sucesso!',
    deleted: 'Matéria excluída com sucesso!',
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'nome_curso', label: 'NOME DA MATÉRIA', field: 'nome_curso', align: 'left', sortable: true },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const filteredRows = computed(() => {
  if (!filter.value.trim()) return rows.value
  const q = filter.value.toLowerCase()
  return rows.value.filter((r) => r.nome_curso?.toLowerCase().includes(q))
})

onMounted(load)
</script>
