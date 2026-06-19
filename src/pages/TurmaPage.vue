<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-3">
        <StatCardMini title="Turmas" :value="rows.length" icon="domain" theme="green" />
      </div>
      <div class="col-12 col-md-3">
        <StatCardMini title="Campus" :value="campus.length" icon="location_city" theme="blue" />
      </div>
      <div class="col-12 col-md-3">
        <StatCardMini title="Cursos" :value="cursos.length" icon="school" theme="orange" />
      </div>
      <div class="col-12 col-md-3">
        <StatCardMini title="Matérias" :value="materias.length" icon="bookmark" theme="purple" />
      </div>
    </div>

    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Nova Turma
      </q-btn>
    </div>

    <BaseDataTable
      v-model:filter="filter"
      title="Lista de Turmas"
      :subtitle="`${rows.length} turma${rows.length !== 1 ? 's' : ''} cadastrada${rows.length !== 1 ? 's' : ''}`"
      :rows="filteredRows"
      :columns="columns"
      :loading="loading"
      search-placeholder="Buscar turmas..."
      empty-label="Nenhuma turma cadastrada"
      @edit="openEdit"
      @delete="confirmDelete"
    >
      <template v-slot:filters>
        <q-input
          v-model.number="filtros.anoLetivo"
          outlined
          dense
          clearable
          type="number"
          label="Ano letivo"
          class="table-filter-field bg-white"
        />
        <q-input
          v-model="filtros.curso"
          outlined
          dense
          clearable
          label="Curso"
          class="table-filter-field bg-white"
        />
        <q-input
          v-model="filtros.campus"
          outlined
          dense
          clearable
          label="Campus"
          class="table-filter-field bg-white"
        />
      </template>

      <template v-slot:body-cell-curso="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">
            {{
              props.row.curso?.nomeCurso || cursosMap[props.row.idCurso] || 'Curso não informado'
            }}
          </div>
          <div class="text-caption text-muted">
            ID {{ props.row.curso?.id || props.row.idCurso || 'não informado' }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-materias="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">
            {{ props.row.materias?.map(m => m.nomeMateria).join(', ') || 'Nenhuma matéria' }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-campus="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">
            {{
              props.row.campus?.nome ||
              campusMap[props.row.idCampus]?.nome ||
              'Campus não informado'
            }}
          </div>
          <div class="text-caption text-muted">
            {{
              props.row.campus?.cidade ||
              campusMap[props.row.idCampus]?.cidade ||
              'Cidade não informada'
            }}
          </div>
        </q-td>
      </template>
    </BaseDataTable>

    <TurmaFormDialog
      v-model="dialogOpen"
      :editing-id="editingId"
      v-model:form="form"
      :errors="errors"
      :saving="saving"
      :curso-options="cursoOptions"
      :campus-options="campusOptions"
      :materia-options="materiaOptions"
      @close="closeDialog"
      @save="save"
    />

    <ConfirmDialog
      v-model="confirmOpen"
      title="Excluir Turma"
      message="Deseja excluir a turma "
      :highlight="pendingDelete ? `${pendingDelete.serie} - ${pendingDelete.anoLetivo}` : ''"
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
import StatCardMini from 'src/components/StatCardMini.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import TurmaFormDialog from 'src/components/crud/TurmaFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import turmaService from 'src/services/turmaService'
import campusService from 'src/services/campusService'
import cursoService from 'src/services/cursoService'
import materiaService from 'src/services/materiaService'

const filter = ref('')
const filtros = ref({
  anoLetivo: null,
  curso: '',
  campus: '',
})
const campus = ref([])
const cursos = ref([])
const materias = ref([])
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
  service: turmaService,
  emptyForm: () => ({
    anoLetivo: new Date().getFullYear(),
    serie: '',
    idCurso: null,
    idCampus: null,
    materiasIds: [],
  }),
  validate: (f) => {
    const e = {}
    if (!f.anoLetivo || f.anoLetivo < 2000) e.anoLetivo = 'Ano letivo deve ser 2000 ou superior'
    if (!f.serie?.trim()) e.serie = 'Série é obrigatória'
    if (f.idCurso == null) e.idCurso = 'Selecione um curso'
    if (f.idCampus == null) e.idCampus = 'Selecione um campus'
    return e
  },
  messages: {
    created: 'Turma criada com sucesso!',
    updated: 'Turma atualizada com sucesso!',
    deleted: 'Turma excluída com sucesso!',
  },
  loadFn: async () => {
    const [turmas, campusList, cursosList, materiasList] = await Promise.all([
      turmaService.findAll({
        serie: filter.value,
        anoLetivo: filtros.value.anoLetivo,
        curso: filtros.value.curso,
        campus: filtros.value.campus,
      }),
      campusService.findAll(),
      cursoService.findAll(),
      materiaService.getAll()
    ])
    campus.value = campusList
    cursos.value = cursosList
    materias.value = materiasList
    return turmas
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'anoLetivo', label: 'ANO LETIVO', field: 'anoLetivo', align: 'left', sortable: true },
  { name: 'serie', label: 'SÉRIE', field: 'serie', align: 'left', sortable: true },
  { name: 'curso', label: 'CURSO', field: 'curso', align: 'left' },
  { name: 'materias', label: 'MATÉRIAS', field: 'materias', align: 'left' },
  { name: 'campus', label: 'CAMPUS', field: 'campus', align: 'left' },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const cursosMap = computed(() => Object.fromEntries(cursos.value.map((c) => [c.id, c.nomeCurso])))
const campusMap = computed(() =>
  Object.fromEntries(campus.value.map((c) => [c.id, { nome: c.nome, cidade: c.cidade }])),
)
const cursoOptions = computed(() => cursos.value.map((c) => ({ label: c.nomeCurso, value: c.id })))
const campusOptions = computed(() =>
  campus.value.map((c) => ({ label: `${c.nome} — ${c.cidade}`, value: c.id })),
)
const materiaOptions = computed(() => materias.value.map((m) => ({ label: m.nomeMateria, value: m.id })))

const filteredRows = computed(() => rows.value)

watch(
  [filter, filtros],
  () => {
    clearTimeout(filtroTimeout)
    filtroTimeout = setTimeout(load, 350)
  },
  { deep: true },
)

onMounted(load)
</script>
