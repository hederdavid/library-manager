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
          <q-icon name="person_outline" size="18px" class="q-mr-xs" /> Aluno
        </label>
        <q-select
          v-model="loansStore.form.student"
          outlined
          dense
          use-input
          input-debounce="300"
          placeholder="Buscar por nome ou matrícula..."
          :options="loansStore.studentOptions"
          class="custom-field"
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-6" />
          </template>
        </q-select>
      </div>

      <div class="form-section q-mt-lg">
        <label class="form-label">
          <q-icon name="menu_book" size="18px" class="q-mr-xs" /> Livro (por código)
        </label>
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-input
              v-model="loansStore.form.bookCode"
              outlined
              dense
              placeholder="EX: INF-001"
              class="custom-field"
            />
          </div>
          <div class="col-auto">
            <q-btn
              unelevated
              color="primary"
              label="Buscar"
              class="search-btn"
              :loading="loansStore.searchingBook"
            />
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mt-md">
        <div class="col-12 col-md-6">
          <label class="form-label">
            <q-icon name="calendar_today" size="18px" class="q-mr-xs" /> Data de Saída
          </label>
          <q-input
            v-model="loansStore.form.startDate"
            outlined
            dense
            mask="####-##-##"
            class="custom-field"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" size="20px" color="primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="loansStore.form.startDate" mask="YYYY-MM-DD" color="primary">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label">
            <q-icon name="event_available" size="18px" class="q-mr-xs" /> Devolução Prevista
            *
          </label>
          <q-input
            v-model="loansStore.form.dueDate"
            outlined
            dense
            mask="####-##-##"
            class="custom-field"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" size="20px" color="primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="loansStore.form.dueDate" mask="YYYY-MM-DD" color="primary">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="form-section q-mt-lg">
        <label class="form-label">Condição do Livro na Entrega</label>
        <div class="condition-toggle-row">
          <q-btn-toggle
            v-model="loansStore.form.condition"
            toggle-color="primary"
            text-color="grey-7"
            unelevated
            flat
            padding="8px 24px"
            class="custom-toggle"
            :options="[
              { label: 'Novo', value: 'novo' },
              { label: 'Bom', value: 'bom' },
              { label: 'Regular', value: 'regular' },
              { label: 'Ruim', value: 'ruim' },
            ]"
          />
        </div>
      </div>

      <div class="form-actions q-mt-xl">
        <q-btn
          unelevated
          color="secondary"
          class="submit-btn full-width"
          @click="submitLoan"
        >
          <q-icon name="swap_horiz" class="q-mr-sm" /> Registrar Empréstimo
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useLoansStore } from 'src/stores/loansStore'

const $q = useQuasar()
const loansStore = useLoansStore()

const submitLoan = () => {
  $q.notify({
    color: 'positive',
    message: 'Empréstimo registrado com sucesso!',
    icon: 'check',
  })
  loansStore.resetForm()
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

.search-btn {
  height: 40px;
  padding: 0 24px;
  border-radius: 10px;
  background: $primary !important;
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
