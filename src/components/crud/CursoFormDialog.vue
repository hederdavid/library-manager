<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Matéria' : 'Nova Matéria'"
    subtitle="Preencha o nome da matéria / curso"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Matéria'"
    :saving="saving"
    :width="480"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <label class="lib-form-label">Nome da Matéria *</label>
    <q-input
      :model-value="form.nomeCurso"
      @update:model-value="$emit('update:form', { ...form, nomeCurso: $event })"
      outlined
      dense
      placeholder="Ex: Programação Orientada a Objetos"
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
