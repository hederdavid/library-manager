<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Matéria' : 'Nova Matéria'"
    subtitle="Preencha os dados da matéria"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Matéria'"
    :saving="saving"
    :width="520"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <div class="q-mb-md">
      <label class="lib-form-label">Nome da Matéria *</label>
      <q-input
        :model-value="form.nomeMateria"
        @update:model-value="$emit('update:form', { ...form, nomeMateria: $event })"
        outlined
        dense
        placeholder="Ex: Lógica de Programação"
        class="lib-form-field"
        :error="!!errors.nomeMateria"
        :error-message="errors.nomeMateria"
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
