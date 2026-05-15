<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <StatCardMini title="Turmas" :value="rows.length" icon="domain" theme="green" />
      </div>
      <div class="col-12 col-md-4">
        <StatCardMini title="Campus" :value="campus.length" icon="location_city" theme="blue" />
      </div>
      <div class="col-12 col-md-4">
        <StatCardMini title="Matérias" :value="cursos.length" icon="bookmark" theme="orange" />
      </div>
    </div>

    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Nova Turma
      </q-btn>
    </div>

    <div class="lib-card">
      <div class="table-toolbar q-px-lg q-py-md">
        <div class="table-toolbar__main-row">
          <div>
            <h2 class="text-h6 text-weight-bold text-main q-ma-none">Lista de Turmas</h2>
            <p class="text-caption text-muted q-mt-xs q-mb-none">
              {{ rows.length }} turma{{ rows.length !== 1 ? 's' : '' }} cadastrada{{ rows.length !== 1 ? 's' : '' }}
            </p>
          </div>
          <q-input
            v-model="filter"
            outlined
            dense
            placeholder="Buscar turmas..."
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
        no-data-label="Nenhuma turma cadastrada"
      >
        <template v-slot:body-cell-idCurso="props">
          <q-td :props="props">
            <span class="course-badge">{{ cursosMap[props.row.idCurso] || `ID ${props.row.idCurso}` }}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-idCampus="props">
          <q-td :props="props">
            {{ campusMap[props.row.idCampus] || `ID ${props.row.idCampus}` }}
          </q-td>
        </template>

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

    <TurmaFormDialog
      v-model="dialogOpen"
      :editing-id="editingId"
      v-model:form="form"
      :errors="errors"
      :saving="saving"
      :curso-options="cursoOptions"
      :campus-options="campusOptions"
      @close="closeDialog"
      @save="save"
    />

    <ConfirmDialog
      v-model="confirmOpen"
      title="Excluir Turma"
      :message="`Deseja excluir a turma <strong>${pendingDelete?.serie} — ${pendingDelete?.anoLetivo}</strong>? Esta ação não pode ser desfeita.`"
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
import StatCardMini from 'src/components/StatCardMini.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import TurmaFormDialog from 'src/components/crud/TurmaFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import turmaService from 'src/services/turmaService'
import campusService from 'src/services/campusService'
import cursoService from 'src/services/cursoService'

const filter = ref('')
const campus = ref([])
const cursos = ref([])

const {
  loading, saving, deleting, rows, dialogOpen, editingId, errors, form,
  confirmOpen, pendingDelete, load, openCreate, openEdit, closeDialog, save, confirmDelete, handleDelete,
} = useCrud({
  service: turmaService,
  emptyForm: () => ({ anoLetivo: new Date().getFullYear(), serie: '', idCurso: null, idCampus: null }),
  validate: (f) => {
    const e = {}
    if (!f.anoLetivo || f.anoLetivo < 2000) e.anoLetivo = 'Ano letivo deve ser 2000 ou superior'
    if (!f.serie?.trim()) e.serie = 'Série é obrigatória'
    if (f.idCurso == null) e.idCurso = 'Selecione uma matéria'
    if (f.idCampus == null) e.idCampus = 'Selecione um campus'
    return e
  },
  messages: {
    created: 'Turma criada com sucesso!',
    updated: 'Turma atualizada com sucesso!',
    deleted: 'Turma excluída com sucesso!',
  },
  loadFn: async () => {
    const [turmas, campusList, cursosList] = await Promise.all([
      turmaService.findAll(),
      campusService.findAll(),
      cursoService.findAll(),
    ])
    campus.value = campusList
    cursos.value = cursosList
    return turmas
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'anoLetivo', label: 'ANO LETIVO', field: 'anoLetivo', align: 'left', sortable: true },
  { name: 'serie', label: 'SÉRIE', field: 'serie', align: 'left', sortable: true },
  { name: 'idCurso', label: 'MATÉRIA', field: 'idCurso', align: 'left' },
  { name: 'idCampus', label: 'CAMPUS', field: 'idCampus', align: 'left' },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const cursosMap = computed(() => Object.fromEntries(cursos.value.map((c) => [c.id, c.nome_curso])))
const campusMap = computed(() => Object.fromEntries(campus.value.map((c) => [c.id, `${c.nome} — ${c.cidade}`])))
const cursoOptions = computed(() => cursos.value.map((c) => ({ label: c.nome_curso, value: c.id })))
const campusOptions = computed(() => campus.value.map((c) => ({ label: `${c.nome} — ${c.cidade}`, value: c.id })))

const filteredRows = computed(() => {
  if (!filter.value.trim()) return rows.value
  const q = filter.value.toLowerCase()
  return rows.value.filter(
    (r) =>
      String(r.anoLetivo).includes(q) ||
      r.serie?.toLowerCase().includes(q) ||
      cursosMap.value[r.idCurso]?.toLowerCase().includes(q) ||
      campusMap.value[r.idCampus]?.toLowerCase().includes(q),
  )
})

onMounted(load)
</script>

<style lang="scss" scoped>
.course-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
  background: $tag-blue-bg;
  color: $tag-blue-text;
}
</style>
