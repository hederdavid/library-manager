<template>
  <q-page padding class="q-pa-xl loans-page">
    <div class="header-row q-mb-xl">
      <div class="header-title">
        <h1 class="text-h4 text-weight-bold text-main q-ma-none">Empréstimos e Devoluções</h1>
        <p class="text-subtitle2 text-muted q-mt-xs q-mb-none">Controle de empréstimos de livros</p>
      </div>

      <div class="header-actions flex items-center gap-md">
        <q-input
          outlined
          dense
          placeholder="Busca rápida..."
          class="top-search-input bg-white"
          rounded
        >
          <template v-slot:prepend>
            <q-icon name="search" size="20px" color="grey-5" />
          </template>
        </q-input>

        <q-btn round flat class="notification-btn bg-white shadow-1 text-grey-7">
          <q-icon name="notifications_none" size="20px" />
          <q-badge color="negative" floating rounded class="notification-dot"></q-badge>
        </q-btn>

        <q-avatar
          size="44px"
          font-size="16px"
          color="primary"
          text-color="white"
          class="admin-avatar-top text-weight-bold"
        >
          AD
        </q-avatar>
      </div>
    </div>

    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <StatCardMini title="Ativos" value="6" icon="schedule" theme="blue" />
      </div>
      <div class="col-12 col-md-4">
        <StatCardMini title="Atrasados" value="5" icon="report_problem" theme="red" />
      </div>
      <div class="col-12 col-md-4">
        <StatCardMini title="Devolvidos" value="4" icon="check_circle_outline" theme="green" />
      </div>
    </div>

    <div class="loans-content-card">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey-7 custom-tabs"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="new" label="Nova Entrega" icon="add" class="tab-item custom-tab" />
        <q-tab name="return" class="tab-item custom-tab">
          <div class="flex items-center gap-sm">
            <q-icon name="sync" size="20px" />
            <span class="text-weight-bold tab-label-text">Devolução</span>
            <q-badge color="red-1" text-color="negative" class="tab-badge">5</q-badge>
          </div>
        </q-tab>
        <q-tab name="history" class="tab-item custom-tab">
          <div class="flex items-center gap-sm">
            <q-icon name="text_snippet" size="20px" />
            <span class="text-weight-bold tab-label-text">Histórico</span>
            <q-badge color="grey-2" text-color="grey-7" class="tab-badge">10</q-badge>
          </div>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-transparent">
        <q-tab-panel name="new" class="tab-panel-content">
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
                  v-model="form.student"
                  outlined
                  dense
                  use-input
                  input-debounce="300"
                  placeholder="Buscar por nome ou matrícula..."
                  :options="studentOptions"
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
                      v-model="form.bookCode"
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
                      :loading="searchingBook"
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
                    v-model="form.startDate"
                    outlined
                    dense
                    mask="####-##-##"
                    class="custom-field"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" size="20px" color="primary">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.startDate" mask="YYYY-MM-DD" color="primary">
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
                    v-model="form.dueDate"
                    outlined
                    dense
                    mask="####-##-##"
                    class="custom-field"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" size="20px" color="primary">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.dueDate" mask="YYYY-MM-DD" color="primary">
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
                    v-model="form.condition"
                    toggle-color="primary"
                    textColor="grey-7"
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
        </q-tab-panel>

        <q-tab-panel name="return" class="tab-panel-content">
          <div class="return-container flex flex-center">
            <div class="return-box">
              <div class="form-header text-center">
                <h2 class="text-h6 text-weight-bold text-primary q-ma-none">
                  <q-icon name="sync" class="q-mr-sm" /> Registrar Devolução
                </h2>
              </div>
              <div class="row q-col-gutter-sm q-mt-lg">
                <div class="col-12">
                  <q-input
                    v-model="returnCode"
                    outlined
                    dense
                    placeholder="DIGITE O CÓDIGO DO LIVRO (EX: INF-001)..."
                    class="custom-field"
                  />
                </div>
                <div class="col-12 q-mt-sm">
                  <q-btn
                    unelevated
                    color="primary"
                    label="Buscar"
                    class="full-width search-btn"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="history" class="q-pa-none">
          <div class="q-pa-md">
            <div class="row items-center q-col-gutter-md q-mb-lg">
              <div class="col">
                <q-input
                  outlined
                  dense
                  placeholder="Buscar por aluno, matrícula, livro ou código..."
                  bg-color="white"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" size="20px" color="grey-6" />
                  </template>
                </q-input>
              </div>
              <div class="col-auto">
                <q-select
                  outlined
                  dense
                  v-model="statusFilter"
                  :options="['Todos os status', 'Ativo', 'Devolvido', 'Atrasado']"
                  bg-color="white"
                  style="min-width: 150px"
                />
              </div>
            </div>

            <q-table
              flat
              bordered
              :rows="historyRows"
              :columns="historyColumns"
              row-key="id"
              class="history-table"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-condition="props">
                <q-td :props="props">
                  <div class="flex items-center gap-xs">
                    <q-icon
                      name="north"
                      size="12px"
                      color="positive"
                      v-if="props.value === 'Novo'"
                    />
                    <span class="condition-tag" :class="`tag--${props.value.toLowerCase()}`">{{
                      props.value
                    }}</span>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge
                    unelevated
                    class="status-badge"
                    :class="`status--${props.value.toLowerCase()}`"
                  >
                    <q-icon
                      :name="
                        props.value === 'Atrasado'
                          ? 'report_problem'
                          : props.value === 'Ativo'
                            ? 'schedule'
                            : 'check_circle'
                      "
                      size="12px"
                      class="q-mr-xs"
                    />
                    {{ props.value }}
                  </q-badge>
                </q-td>
              </template>

              <template v-slot:body-cell-student="props">
                <q-td :props="props">
                  <div class="text-weight-bold text-main">{{ props.row.studentName }}</div>
                  <div class="text-caption text-muted">{{ props.row.studentId }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-book="props">
                <q-td :props="props">
                  <div class="text-weight-bold text-main">{{ props.row.bookTitle }}</div>
                  <div class="text-caption text-muted">{{ props.row.bookCode }}</div>
                </q-td>
              </template>
            </q-table>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import StatCardMini from 'src/components/StatCardMini.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const tab = ref('new')
const searchingBook = ref(false)
const returnCode = ref('')
const statusFilter = ref('Todos os status')

const form = ref({
  student: null,
  bookCode: '',
  startDate: '2026-03-24',
  dueDate: '',
  condition: 'bom',
})

const studentOptions = ref([
  'Rafael Torres Nunes (20240007)',
  'João Pedro Silva (20240001)',
  'Juliana Pereira Gomes (20240008)',
])

const historyColumns = [
  { name: 'student', align: 'left', label: 'ALUNO', field: 'studentName' },
  { name: 'book', align: 'left', label: 'LIVRO', field: 'bookTitle' },
  { name: 'outDate', align: 'left', label: 'SAÍDA', field: 'outDate' },
  { name: 'dueDate', align: 'left', label: 'PREV. DEVOLUÇÃO', field: 'dueDate' },
  { name: 'returnDate', align: 'left', label: 'DEVOLUÇÃO REAL', field: 'returnDate' },
  { name: 'condition', align: 'left', label: 'CONDIÇÃO', field: 'condition' },
  { name: 'status', align: 'left', label: 'STATUS', field: 'status' },
  { name: 'obs', align: 'left', label: 'OBS.', field: 'obs' },
]

const historyRows = ref([
  {
    id: 1,
    studentName: 'Rafael Torres Nunes',
    studentId: '20240007',
    bookTitle: 'Química Orgânica',
    bookCode: 'QUI-001',
    outDate: '05/03/2026',
    dueDate: '05/04/2026',
    returnDate: '20/03/2026',
    condition: 'Novo',
    status: 'Devolvido',
    obs: '-',
  },
  {
    id: 2,
    studentName: 'João Pedro Silva',
    studentId: '20240001',
    bookTitle: 'Programação Orientada a...',
    bookCode: 'INF-013',
    outDate: '01/03/2026',
    dueDate: '01/04/2026',
    returnDate: '-',
    condition: 'Bom',
    status: 'Ativo',
    obs: '-',
  },
  {
    id: 3,
    studentName: 'Juliana Pereira Gomes',
    studentId: '20240008',
    bookTitle: 'Redes de Computadores',
    bookCode: 'INF-008',
    outDate: '20/02/2026',
    dueDate: '20/03/2026',
    returnDate: '22/03/2026',
    condition: 'Novo',
    status: 'Devolvido',
    obs: 'Devolvido com 2 dias d...',
  },
  {
    id: 4,
    studentName: 'Ana Luíza Costa',
    studentId: '20240004',
    bookTitle: 'Fundamentos de Física V...',
    bookCode: 'FIS-001',
    outDate: '15/02/2026',
    dueDate: '15/03/2026',
    returnDate: '-',
    condition: 'Bom',
    status: 'Atrasado',
    obs: '-',
  },
])

const submitLoan = () => {
  $q.notify({
    color: 'positive',
    message: 'Empréstimo registrado com sucesso!',
    icon: 'check',
  })
}
</script>

<style lang="scss" scoped>
.loans-page {
  background-color: $bg-input;
  min-height: 100vh;
}

.text-main {
  color: $text-main;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h1 {
  font-size: 24px;
}

.notification-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
  color: #64748b;
}

.notification-dot {
  width: 9px;
  height: 9px;
  border: 2px solid white;
  top: 10px;
  right: 10px;
}

.top-search-input {
  width: 250px;
  :deep(.q-field__control) {
    border-radius: 20px;
    height: 40px;
  }
}

.admin-avatar-top {
  background-color: $primary !important;
}

.loans-content-card {
  background: white;
  border-radius: 20px;
  border: 1px solid $border;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.custom-tabs {
  padding: 0 24px;
  background: $bg-input;
}

.tab-item {
  min-height: 64px;
  padding: 0 24px;
  font-weight: 600;
  text-transform: none;
}

.custom-tab {
  &.q-tab--active {
    color: $primary !important;
  }
}

.tab-label-text {
  font-size: 14px;
  margin-left: 6px;
}

.tab-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
}

.tab-panel-content {
  padding: 48px;
}

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

.return-box {
  max-width: 500px;
  width: 100%;
}

.history-table {
  :deep(thead tr th) {
    font-weight: 700;
    color: $text-muted;
    background: $bg-input;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  :deep(tbody tr td) {
    padding: 16px;
  }
}

.condition-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;

  &.tag--novo {
    color: $tag-green-text;
    background: $tag-green-bg;
  }
  &.tag--bom {
    color: $tag-blue-text;
    background: $tag-blue-bg;
  }
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 11px;

  &.status--devolvido {
    color: $tag-green-text;
    background: $tag-green-bg;
  }
  &.status--ativo {
    color: $tag-blue-text;
    background: $tag-blue-bg;
  }
  &.status--atrasado {
    color: $tag-red-text;
    background: $tag-red-bg;
  }
}
</style>
