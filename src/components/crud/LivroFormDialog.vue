<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent>
    <q-card class="lib-dialog" style="width: 620px; max-width: 95vw">
      <q-card-section class="row items-center q-pb-none q-pt-lg q-px-lg">
        <div>
          <div class="text-h6 text-weight-bold text-main">{{ editingId ? 'Editar Livro' : 'Novo Livro' }}</div>
          <div class="text-caption text-muted q-mt-xs">Preencha os dados do livro</div>
        </div>
        <q-space />
        <q-btn flat round dense icon="close" color="grey-6" @click="$emit('close')" />
      </q-card-section>

      <q-separator class="q-mt-md" />

      <q-card-section class="q-pa-lg">
        <div class="q-mb-md">
          <label class="lib-form-label">Título *</label>
          <q-input
            :model-value="form.titulo"
            @update:model-value="$emit('update:form', { ...form, titulo: $event })"
            outlined
            dense
            placeholder="Ex: Algoritmos: Teoria e Prática"
            class="lib-form-field"
            :error="!!errors.titulo"
            :error-message="errors.titulo"
          />
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm-6">
            <label class="lib-form-label">Código *</label>
            <q-input
              :model-value="form.codigo"
              @update:model-value="$emit('update:form', { ...form, codigo: $event })"
              outlined
              dense
              placeholder="Ex: INF-001"
              class="lib-form-field"
              :error="!!errors.codigo"
              :error-message="errors.codigo"
            />
          </div>
          <div class="col-12 col-sm-6">
            <label class="lib-form-label">Autor</label>
            <q-input
              :model-value="form.autor"
              @update:model-value="$emit('update:form', { ...form, autor: $event })"
              outlined
              dense
              placeholder="Ex: Thomas H. Cormen"
              class="lib-form-field"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-4">
            <label class="lib-form-label">Categoria</label>
            <q-input
              :model-value="form.categoria"
              @update:model-value="$emit('update:form', { ...form, categoria: $event })"
              outlined
              dense
              placeholder="Ex: Informática"
              class="lib-form-field"
            />
          </div>
          <div class="col-12 col-sm-4">
            <label class="lib-form-label">Condição</label>
            <q-select
              :model-value="form.condicao"
              @update:model-value="$emit('update:form', { ...form, condicao: $event })"
              :options="['Novo', 'Bom', 'Regular', 'Ruim']"
              outlined
              dense
              class="lib-form-field"
            />
          </div>
          <div class="col-12 col-sm-4">
            <label class="lib-form-label">Status</label>
            <q-select
              :model-value="form.status"
              @update:model-value="$emit('update:form', { ...form, status: $event })"
              :options="['Disponível', 'Emprestado', 'Reservado']"
              outlined
              dense
              class="lib-form-field"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none">
        <q-btn flat label="Cancelar" color="grey-7" @click="$emit('close')" />
        <q-btn
          unelevated
          color="primary"
          :label="editingId ? 'Salvar Alterações' : 'Criar Livro'"
          :loading="saving"
          class="lib-action-btn"
          @click="$emit('save')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  editingId: [Number, String, null],
  form: Object,
  errors: Object,
  saving: Boolean,
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
