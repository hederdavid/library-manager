<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Livro
      </q-btn>
    </div>

    <BaseDataTable
      v-model:filter="filter"
      title="Lista de Livros"
      :subtitle="`${rows.length} livro${rows.length !== 1 ? 's' : ''} cadastrado${rows.length !== 1 ? 's' : ''}`"
      :rows="filteredRows"
      :columns="columns"
      :loading="loading"
      search-placeholder="Buscar livros..."
      empty-label="Nenhum livro cadastrado"
      @edit="openEdit"
      @delete="confirmDelete"
    >
      <template v-slot:filters>
        <q-input
          v-model="filtros.disciplina"
          outlined
          dense
          clearable
          label="Disciplina"
          class="table-filter-field bg-white"
        />
        <q-input
          v-model="filtros.anoEscolar"
          outlined
          dense
          clearable
          label="Ano escolar"
          class="table-filter-field bg-white"
        />
        <q-input
          v-model="filtros.edicao"
          outlined
          dense
          clearable
          label="Edição"
          class="table-filter-field bg-white"
        />
      </template>

      <template v-slot:body-cell-book="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.titulo }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-disciplina="props">
        <q-td :props="props">
          <span class="book-subject">{{ props.row.disciplina }}</span>
        </q-td>
      </template>
    </BaseDataTable>

    <LivroFormDialog
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
      title="Excluir Livro"
      message="Deseja excluir o livro "
      :highlight="pendingDelete?.titulo"
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
import LivroFormDialog from 'src/components/crud/LivroFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import livroService from 'src/services/livroService'

const filter = ref('')
const filtros = ref({
  disciplina: '',
  anoEscolar: '',
  edicao: '',
})
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
  service: livroService,
  emptyForm: () => ({
    titulo: '',
    disciplina: '',
    anoEscolar: '',
    edicao: '',
  }),
  validate: (f) => {
    const e = {}
    if (!f.titulo?.trim()) e.titulo = 'Título é obrigatório'
    if (!f.disciplina?.trim()) e.disciplina = 'Disciplina é obrigatória'
    if (!f.anoEscolar?.trim()) e.anoEscolar = 'Ano escolar é obrigatório'
    if (!f.edicao?.trim()) e.edicao = 'Edição é obrigatória'
    return e
  },
  messages: {
    created: 'Livro criado com sucesso!',
    updated: 'Livro atualizado com sucesso!',
    deleted: 'Livro excluído com sucesso!',
  },
  loadFn: () =>
    livroService.findAll({
      titulo: filter.value,
      disciplina: filtros.value.disciplina,
      anoEscolar: filtros.value.anoEscolar,
      edicao: filtros.value.edicao,
    }),
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'book', label: 'TÍTULO', field: 'titulo', align: 'left', sortable: true },
  { name: 'disciplina', label: 'DISCIPLINA', field: 'disciplina', align: 'left', sortable: true },
  { name: 'anoEscolar', label: 'ANO ESCOLAR', field: 'anoEscolar', align: 'left', sortable: true },
  { name: 'edicao', label: 'EDIÇÃO', field: 'edicao', align: 'left', sortable: true },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

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

<style lang="scss" scoped>
.book-subject {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 10px;
  border-radius: 6px;
  background: $tag-blue-bg;
  color: $tag-blue-text;
  font-size: 12px;
  font-weight: 700;
}
</style>
