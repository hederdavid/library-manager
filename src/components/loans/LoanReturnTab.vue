<template>
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
            v-model="loansStore.returnCode"
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
</template>

<script setup>
import { useLoansStore } from 'src/stores/loansStore'

const loansStore = useLoansStore()
</script>

<style lang="scss" scoped>
.return-box {
  max-width: 500px;
  width: 100%;
}

.custom-field :deep(.q-field__control) {
  border-radius: 10px;
  background: $bg-input;
}

.search-btn {
  border-radius: 10px;
  background: $primary !important;
}
</style>
