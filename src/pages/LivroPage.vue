<template>
  <q-page padding class="q-px-xl q-pb-xl q-pt-lg lib-page">
    <div class="table-page-actions q-mb-md">
      <q-btn unelevated color="primary" class="lib-action-btn" @click="openCreate">
        <q-icon name="add" size="18px" class="q-mr-sm" />Novo Livro
      </q-btn>
    </div>

    <div class="lib-card">
      <div class="table-toolbar q-px-lg q-py-md">
        <div class="table-toolbar__main-row">
          <div>
            <h2 class="text-h6 text-weight-bold text-main q-ma-none">Lista de Livros</h2>
            <p class="text-caption text-muted q-mt-xs q-mb-none">
              {{ rows.length }} livro{{ rows.length !== 1 ? 's' : '' }} cadastrado{{ rows.length !== 1 ? 's' : '' }}
            </p>
          </div>
          <q-input
            v-model="filter"
            outlined
            dense
            placeholder="Buscar livros..."
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
        no-data-label="Nenhum livro cadastrado"
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
      :message="`Deseja excluir o livro <strong>${pendingDelete?.titulo}</strong>? Esta ação não pode ser desfeita.`"
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
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import LivroFormDialog from 'src/components/crud/LivroFormDialog.vue'
import { useCrud } from 'src/composables/useCrud'
import livroService from 'src/services/livroService'

const filter = ref('')

const {
  loading, saving, deleting, rows, dialogOpen, editingId, errors, form,
  confirmOpen, pendingDelete, load, openCreate, openEdit, closeDialog, save, confirmDelete, handleDelete,
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
