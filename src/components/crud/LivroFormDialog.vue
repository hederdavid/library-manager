<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Livro' : 'Novo Livro'"
    subtitle="Preencha os dados do livro"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Livro'"
    :saving="saving"
    :width="620"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
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
  </BaseFormDialog>
</template>

<script setup>
import BaseFormDialog from 'src/components/base/BaseFormDialog.vue'

defineProps({
  modelValue: Boolean,
  editingId: [Number, String, null],
  form: Object,
  errors: Object,
  saving: Boolean,
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
