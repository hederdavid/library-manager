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
        <label class="lib-form-label">Disciplina *</label>
        <q-input
          :model-value="form.disciplina"
          @update:model-value="$emit('update:form', { ...form, disciplina: $event })"
          outlined
          dense
          placeholder="Ex: Informática"
          class="lib-form-field"
          :error="!!errors.disciplina"
          :error-message="errors.disciplina"
        />
      </div>
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Ano Escolar *</label>
        <q-input
          :model-value="form.anoEscolar"
          @update:model-value="$emit('update:form', { ...form, anoEscolar: $event })"
          outlined
          dense
          placeholder="Ex: 1º ano"
          class="lib-form-field"
          :error="!!errors.anoEscolar"
          :error-message="errors.anoEscolar"
        />
      </div>
    </div>

    <div>
      <label class="lib-form-label">Edição *</label>
      <q-input
        :model-value="form.edicao"
        @update:model-value="$emit('update:form', { ...form, edicao: $event })"
        outlined
        dense
        placeholder="Ex: 3ª edição"
        class="lib-form-field"
        :error="!!errors.edicao"
        :error-message="errors.edicao"
      />
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
