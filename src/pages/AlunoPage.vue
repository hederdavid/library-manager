<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Aluno
      </q-btn>
    </div>

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
      <template v-slot:filters>
        <q-input
          v-model="filtros.email"
          outlined
          dense
          clearable
          label="E-mail"
          class="table-filter-field bg-white"
        />
        <q-input
          v-model="filtros.matricula"
          outlined
          dense
          clearable
          label="Matrícula"
          class="table-filter-field bg-white"
        />
        <q-select
          v-model="filtros.turmaId"
          :options="turmaOptions"
          outlined
          dense
          clearable
          emit-value
          map-options
          label="Turma"
          class="table-filter-field bg-white"
        />
      </template>

      <template v-slot:body-cell-student="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.nome }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <span class="student-email">{{ props.row.email || 'E-mail não informado' }}</span>
        </q-td>
      </template>

      <template v-slot:body-cell-turma="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ turmaPrimaryLabel(props.row.turma) }}</div>
          <div class="text-caption text-muted">{{ turmaSecondaryLabel(props.row.turma) }}</div>
        </q-td>
      </template>
    </BaseDataTable>

    <AlunoFormDialog
      v-model="dialogOpen"
      :editing-id="editingId"
      v-model:form="form"
      :errors="errors"
      :saving="saving"
      :turma-options="turmaOptions"
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
import { computed, onMounted, ref, watch } from 'vue'
import BaseDataTable from 'src/components/base/BaseDataTable.vue'
import AlunoFormDialog from 'src/components/crud/AlunoFormDialog.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import alunoService from 'src/services/alunoService'
import turmaService from 'src/services/turmaService'

const filter = ref('')
const filtros = ref({
  email: '',
  matricula: '',
  turmaId: null,
})
const turmas = ref([])
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
  service: alunoService,
  emptyForm: () => ({ nome: '', matricula: '', idTurma: null, email: '' }),
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
  loadFn: () =>
    alunoService.findAll({
      nome: filter.value,
      email: filtros.value.email,
      matricula: filtros.value.matricula,
      turmaId: filtros.value.turmaId,
    }),
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'student', label: 'ALUNO', field: 'nome', align: 'left', sortable: true },
  { name: 'email', label: 'E-MAIL', field: 'email', align: 'left', sortable: true },
  { name: 'matricula', label: 'MATRÍCULA', field: 'matricula', align: 'left', sortable: true },
  { name: 'turma', label: 'TURMA', field: 'turma', align: 'left', sortable: true },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const filteredRows = computed(() => rows.value)
const turmaOptions = computed(() =>
  turmas.value.map((turma) => ({ label: turmaLabel(turma), value: turma.id })),
)

function turmaLabel(turma) {
  if (!turma) return 'Sem turma'
  const curso = turma.curso?.nomeCurso ? ` - ${turma.curso.nomeCurso}` : ''
  return `${turma.serie} (${turma.anoLetivo})${curso}`
}

function turmaPrimaryLabel(turma) {
  if (!turma) return 'Sem turma'
  return `${turma.serie} (${turma.anoLetivo})`
}

function turmaSecondaryLabel(turma) {
  if (!turma) return 'Vínculo não informado'
  const curso = turma.curso?.nomeCurso || 'Matéria não informada'
  const campus = turma.campus
    ? `${turma.campus.nome} - ${turma.campus.cidade}`
    : 'Campus não informado'
  return `${curso} | ${campus}`
}

async function carregarTurmas() {
  turmas.value = await turmaService.findAll()
}

watch(
  [filter, filtros],
  () => {
    clearTimeout(filtroTimeout)
    filtroTimeout = setTimeout(load, 350)
  },
  { deep: true },
)

onMounted(async () => {
  await carregarTurmas()
  await load()
})
</script>

<style lang="scss" scoped>
.student-email {
  color: $text-main;
  word-break: break-word;
}
</style>
