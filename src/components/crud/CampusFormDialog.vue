<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Campus' : 'Novo Campus'"
    subtitle="Preencha os dados do campus"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Campus'"
    :saving="saving"
    :width="480"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <div class="q-mb-md">
      <label class="lib-form-label">Nome do Campus *</label>
      <q-input
        :model-value="form.nome"
        @update:model-value="$emit('update:form', { ...form, nome: $event })"
        outlined
        dense
        placeholder="Ex: IFBA Campus Salvador"
        class="lib-form-field"
        :error="!!errors.nome"
        :error-message="errors.nome"
      />
    </div>
    <div>
      <label class="lib-form-label">Cidade *</label>
      <q-input
        :model-value="form.cidade"
        @update:model-value="$emit('update:form', { ...form, cidade: $event })"
        outlined
        dense
        placeholder="Ex: Salvador"
        class="lib-form-field"
        :error="!!errors.cidade"
        :error-message="errors.cidade"
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
