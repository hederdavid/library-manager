<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Aluno
      </q-btn>
    </div>

    <MockDataBanner
      :show="mockConfig.usarMockAlunos"
      message="Dados demonstrativos: o backend ainda não possui API completa de alunos."
    />

    <BaseDataTable
      v-model:filter="filter"
      title="Lista de Alunos"
      :subtitle="`${rows.length} aluno${rows.length !== 1 ? 's' : ''} cadastrado${rows.length !== 1 ? 's' : ''}`"
      :rows="filteredRows"
      :columns="columns"
      :loading="loading"
      search-placeholder="Buscar alunos..."
      empty-label="Nenhum aluno cadastrado"
      @edit="openEdit"
      @delete="confirmDelete"
    >
      <template v-slot:body-cell-student="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.nome }}</div>
          <div class="text-caption text-muted">{{ props.row.email || 'E-mail não informado' }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge class="status-pill" :class="`status-pill--${props.value.toLowerCase()}`">
            {{ props.value }}
          </q-badge>
        </q-td>
      </template>
    </BaseDataTable>

    <AlunoFormDialog
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
      title="Excluir Aluno"
      message="Deseja excluir o aluno "
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
import { computed, onMounted, ref } from 'vue'
import BaseDataTable from 'src/components/base/BaseDataTable.vue'
import MockDataBanner from 'src/components/base/MockDataBanner.vue'
import AlunoFormDialog from 'src/components/crud/AlunoFormDialog.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import alunoService from 'src/services/alunoService'
import { mockConfig } from 'src/services/mockConfig'

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
  service: alunoService,
  emptyForm: () => ({ nome: '', matricula: '', turma: '', email: '', status: 'Ativo' }),
  validate: (f) => {
    const e = {}
    if (!f.nome?.trim()) e.nome = 'Nome é obrigatório'
    if (!f.matricula?.trim()) e.matricula = 'Matrícula é obrigatória'
    return e
  },
  messages: {
    created: 'Aluno criado com sucesso!',
    updated: 'Aluno atualizado com sucesso!',
    deleted: 'Aluno excluído com sucesso!',
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'student', label: 'ALUNO', field: 'nome', align: 'left', sortable: true },
  { name: 'matricula', label: 'MATRÍCULA', field: 'matricula', align: 'left', sortable: true },
  { name: 'turma', label: 'TURMA', field: 'turma', align: 'left', sortable: true },
  { name: 'status', label: 'STATUS', field: 'status', align: 'left', sortable: true },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const filteredRows = computed(() => {
  if (!filter.value.trim()) return rows.value
  const q = filter.value.toLowerCase()
  return rows.value.filter(
    (r) =>
      r.nome?.toLowerCase().includes(q) ||
      r.matricula?.toLowerCase().includes(q) ||
      r.turma?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.status?.toLowerCase().includes(q),
  )
})

onMounted(load)
</script>
