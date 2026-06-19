<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Estoque
      </q-btn>
    </div>

    <BaseDataTable
      v-model:filter="filter"
      title="Gestão de Estoque"
      :subtitle="`${rows.length} lote${rows.length !== 1 ? 's' : ''} de livro cadastrado${rows.length !== 1 ? 's' : ''}`"
      :rows="filteredRows"
      :columns="columns"
      :loading="loading || loadingLivros"
      search-placeholder="Buscar livro no estoque..."
      empty-label="Nenhum estoque cadastrado"
      @edit="openEdit"
      @delete="confirmDelete"
    >
      <template v-slot:filters>
        <q-input
          v-model="filtros.titulo"
          outlined
          dense
          clearable
          label="Título"
          class="table-filter-field bg-white"
        />
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
      </template>

      <template v-slot:body-cell-livro="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.livroTitulo }}</div>
          <div class="text-caption text-muted">{{ props.row.livroDisciplina }}</div>
        </q-td>
      </template>
    </BaseDataTable>

    <EstoqueFormDialog
      v-model="dialogOpen"
      :editing-id="editingId"
      v-model:form="form"
      :errors="errors"
      :saving="saving"
      :livro-options="livroOptions"
      @close="closeDialog"
      @save="save"
    />

    <ConfirmDialog
      v-model="confirmOpen"
      title="Excluir Estoque"
      message="Deseja excluir o estoque de "
      :highlight="pendingDelete?.livroTitulo"
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
import EstoqueFormDialog from 'src/components/crud/EstoqueFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import estoqueService from 'src/services/estoqueService'
import livroService from 'src/services/livroService'

const filter = ref('')
const filtros = ref({
  titulo: '',
  disciplina: '',
  anoEscolar: '',
})
let filtroTimeout = null

const livros = ref([])
const loadingLivros = ref(false)

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
  service: estoqueService,
  emptyForm: () => ({
    livroId: null,
    qtdTotal: 0,
    qtdDisponivel: 0,
    qtdNovo: 0,
    qtdConservado: 0,
    qtdMalConservado: 0,
    qtdInutilizado: 0,
  }),
  validate: (f) => {
    const e = {}
    if (!f.livroId) e.livroId = 'Selecione um livro'
    if (f.qtdTotal <= 0) e.qtdTotal = 'Quantidade total deve ser maior que 0'
    if (f.qtdDisponivel < 0) e.qtdDisponivel = 'Quantidade disponível não pode ser negativa'
    if (f.qtdDisponivel > f.qtdTotal)
      e.qtdDisponivel = 'Quantidade disponível não pode ser maior que o total'

    const soma = f.qtdNovo + f.qtdConservado + f.qtdMalConservado + f.qtdInutilizado
    if (soma !== f.qtdTotal) {
      e.condicoes = `A soma das condições (${soma}) deve ser exatamente igual à quantidade total (${f.qtdTotal}).`
    }
    return e
  },
  messages: {
    created: 'Estoque criado com sucesso!',
    updated: 'Estoque atualizado com sucesso!',
    deleted: 'Estoque excluído com sucesso!',
  },
  loadFn: () =>
    estoqueService.findAll({
      titulo: filtros.value.titulo || filter.value,
      disciplina: filtros.value.disciplina,
      anoEscolar: filtros.value.anoEscolar,
    }),
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'livro', label: 'LIVRO', field: 'livroTitulo', align: 'left', sortable: true },
  { name: 'qtdTotal', label: 'TOTAL', field: 'qtdTotal', align: 'center', sortable: true },
  {
    name: 'qtdDisponivel',
    label: 'DISPONÍVEL',
    field: 'qtdDisponivel',
    align: 'center',
    sortable: true,
  },
  { name: 'qtdNovo', label: 'NOVO', field: 'qtdNovo', align: 'center' },
  { name: 'qtdConservado', label: 'CONSERVADO', field: 'qtdConservado', align: 'center' },
  { name: 'qtdMalConservado', label: 'MAL CONSERV.', field: 'qtdMalConservado', align: 'center' },
  { name: 'qtdInutilizado', label: 'INUTILIZADO', field: 'qtdInutilizado', align: 'center' },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const filteredRows = computed(() => rows.value)
const livroOptions = computed(() =>
  livros.value.map((livro) => ({
    label: `${livro.titulo} — ${livro.disciplina}`,
    value: livro.id,
  })),
)

async function carregarLivros() {
  loadingLivros.value = true
  try {
    livros.value = await livroService.findAll()
  } finally {
    loadingLivros.value = false
  }
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
  await carregarLivros()
  await load()
})
</script>
