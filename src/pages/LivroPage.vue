<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Livro
      </q-btn>
    </div>

    <MockDataBanner
      :show="mockConfig.usarMockLivros"
      message="Dados demonstrativos: o backend ainda não possui API completa de livros."
    />

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
      <template v-slot:body-cell-book="props">
        <q-td :props="props">
          <div class="text-weight-bold text-main">{{ props.row.titulo }}</div>
          <div class="text-caption text-muted">{{ props.row.autor || 'Autor não informado' }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-condicao="props">
        <q-td :props="props">
          <span class="condition-tag" :class="`condition-tag--${props.value.toLowerCase()}`">
            {{ props.value }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge class="status-pill" :class="`status-pill--${statusClass(props.value)}`">
            {{ props.value }}
          </q-badge>
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
import { computed, onMounted, ref } from 'vue'
import BaseDataTable from 'src/components/base/BaseDataTable.vue'
import MockDataBanner from 'src/components/base/MockDataBanner.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import LivroFormDialog from 'src/components/crud/LivroFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import livroService from 'src/services/livroService'
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
  service: livroService,
  emptyForm: () => ({
    titulo: '',
    codigo: '',
    autor: '',
    categoria: '',
    condicao: 'Bom',
    status: 'Disponível',
  }),
  validate: (f) => {
    const e = {}
    if (!f.titulo?.trim()) e.titulo = 'Título é obrigatório'
    if (!f.codigo?.trim()) e.codigo = 'Código é obrigatório'
    return e
  },
  messages: {
    created: 'Livro criado com sucesso!',
    updated: 'Livro atualizado com sucesso!',
    deleted: 'Livro excluído com sucesso!',
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'book', label: 'LIVRO', field: 'titulo', align: 'left', sortable: true },
  { name: 'codigo', label: 'CÓDIGO', field: 'codigo', align: 'left', sortable: true },
  { name: 'categoria', label: 'CATEGORIA', field: 'categoria', align: 'left', sortable: true },
  { name: 'condicao', label: 'CONDIÇÃO', field: 'condicao', align: 'left', sortable: true },
  { name: 'status', label: 'STATUS', field: 'status', align: 'left', sortable: true },
  { name: 'actions', label: 'AÇÕES', field: 'actions', align: 'center', sortable: false },
]

const statusClass = (status) => {
  if (status === 'Disponível') return 'ativo'
  if (status === 'Emprestado') return 'pendente'
  return 'inativo'
}

const filteredRows = computed(() => {
  if (!filter.value.trim()) return rows.value
  const q = filter.value.toLowerCase()
  return rows.value.filter(
    (r) =>
      r.titulo?.toLowerCase().includes(q) ||
      r.codigo?.toLowerCase().includes(q) ||
      r.autor?.toLowerCase().includes(q) ||
      r.categoria?.toLowerCase().includes(q) ||
      r.condicao?.toLowerCase().includes(q) ||
      r.status?.toLowerCase().includes(q),
  )
})

onMounted(load)
</script>
