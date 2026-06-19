<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Curso' : 'Novo Curso'"
    subtitle="Preencha o nome do curso"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Curso'"
    :saving="saving"
    :width="480"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <label class="lib-form-label">Nome do Curso *</label>
    <q-input
      :model-value="form.nomeCurso"
      @update:model-value="$emit('update:form', { ...form, nomeCurso: $event })"
      outlined
      dense
      placeholder="Ex: Técnico em Informática"
      class="lib-form-field"
      :error="!!errors.nomeCurso"
      :error-message="errors.nomeCurso"
    />
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
