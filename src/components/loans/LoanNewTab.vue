<template>
  <div class="loan-form-container">
    <div class="form-header">
      <h2 class="text-h6 text-weight-bold text-primary q-ma-none">
        <q-icon name="add" class="q-mr-sm" /> Novo Empréstimo
      </h2>
      <p class="text-caption text-muted q-mt-xs q-mb-none">
        Preencha os dados para registrar a saída do livro
      </p>
    </div>

    <div class="form-body q-mt-lg">
      <div class="form-section">
        <label class="form-label">
          <q-icon name="person_outline" size="18px" class="q-mr-xs" /> Aluno *
        </label>
        <q-select
          v-model="loansStore.form.alunoId"
          outlined
          dense
          use-input
          emit-value
          map-options
          input-debounce="300"
          placeholder="Buscar por nome ou matrícula..."
          :options="filteredAlunoOptions"
          :loading="loansStore.loading"
          class="custom-field"
          @filter="filterAlunos"
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-6" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-muted"> Nenhum aluno encontrado </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="form-section q-mt-lg">
        <label class="form-label">
          <q-icon name="menu_book" size="18px" class="q-mr-xs" /> Livro *
        </label>
        <q-select
          v-model="loansStore.form.livroId"
          outlined
          dense
          use-input
          emit-value
          map-options
          input-debounce="300"
          placeholder="Buscar por título ou disciplina..."
          :options="filteredLivroOptions"
          :loading="loansStore.loading"
          class="custom-field"
          @filter="filterLivros"
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-6" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-muted"> Nenhum livro encontrado </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="form-section q-mt-lg">
        <label class="form-label">Condição do Livro na Entrega *</label>
        <div class="condition-toggle-row">
          <q-btn-toggle
            v-model="loansStore.form.condicaoEntrega"
            toggle-color="primary"
            text-color="grey-7"
            unelevated
            flat
            padding="8px 24px"
            class="custom-toggle"
            :options="condicaoOptions"
          />
        </div>
      </div>

      <div class="form-actions q-mt-xl">
        <q-btn
          unelevated
          color="secondary"
          class="submit-btn full-width"
          :loading="loansStore.submitting"
          :disable="!canSubmit"
          @click="submitLoan"
        >
          <q-icon name="swap_horiz" class="q-mr-sm" /> Registrar Empréstimo
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLoansStore } from 'src/stores/loansStore'

const loansStore = useLoansStore()

const condicaoOptions = [
  { label: 'Novo', value: 'NOVO' },
  { label: 'Conservado', value: 'CONSERVADO' },
  { label: 'Mal Conservado', value: 'MAL_CONSERVADO' },
  { label: 'Inutilizado', value: 'INUTILIZADO' },
]

const filteredAlunoOptions = ref(loansStore.alunoOptions)
const filteredLivroOptions = ref(loansStore.livroOptions)

function filterAlunos(val, update) {
  update(() => {
    const needle = val.toLowerCase()
    filteredAlunoOptions.value = loansStore.alunoOptions.filter((opt) =>
      opt.label.toLowerCase().includes(needle),
    )
  })
}

function filterLivros(val, update) {
  update(() => {
    const needle = val.toLowerCase()
    filteredLivroOptions.value = loansStore.livroOptions.filter((opt) =>
      opt.label.toLowerCase().includes(needle),
    )
  })
}

const canSubmit = computed(
  () =>
    loansStore.form.alunoId !== null &&
    loansStore.form.livroId !== null &&
    loansStore.form.condicaoEntrega,
)

const submitLoan = async () => {
  await loansStore.criarEmprestimo()
}
</script>

<style lang="scss" scoped>
.loan-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: $text-muted;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.custom-field :deep(.q-field__control) {
  border-radius: 10px;
  background: $bg-input;
}

.condition-toggle-row {
  background: $bg-input;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid $border-input;
  display: inline-flex;
}

.custom-toggle {
  :deep(.q-btn) {
    border-radius: 8px !important;
    font-size: 13px;
    font-weight: 600;
  }
}

.submit-btn {
  border-radius: 12px;
  height: 52px;
  font-size: 15px;
  font-weight: 700;
  background: #92c3a5 !important;
  color: #1a4d2e !important;
}
</style>
