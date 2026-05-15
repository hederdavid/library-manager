<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Aluno' : 'Novo Aluno'"
    subtitle="Preencha os dados do aluno"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Aluno'"
    :saving="saving"
    :width="560"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <div class="q-mb-md">
      <label class="lib-form-label">Nome *</label>
      <q-input
        :model-value="form.nome"
        @update:model-value="$emit('update:form', { ...form, nome: $event })"
        outlined
        dense
        placeholder="Ex: Maria Fernanda Santos"
        class="lib-form-field"
        :error="!!errors.nome"
        :error-message="errors.nome"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Matrícula *</label>
        <q-input
          :model-value="form.matricula"
          @update:model-value="$emit('update:form', { ...form, matricula: $event })"
          outlined
          dense
          placeholder="Ex: 2024001"
          class="lib-form-field"
          :error="!!errors.matricula"
          :error-message="errors.matricula"
        />
      </div>
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Turma</label>
        <q-select
          :model-value="form.idTurma"
          @update:model-value="$emit('update:form', { ...form, idTurma: $event })"
          :options="turmaOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          clearable
          outlined
          dense
          placeholder="Selecione a turma"
          class="lib-form-field"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8">
        <label class="lib-form-label">E-mail</label>
        <q-input
          :model-value="form.email"
          @update:model-value="$emit('update:form', { ...form, email: $event })"
          type="email"
          outlined
          dense
          placeholder="aluno@ifba.edu.br"
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
  turmaOptions: { type: Array, default: () => [] },
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
