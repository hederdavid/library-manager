<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Turma' : 'Nova Turma'"
    subtitle="Preencha os dados da turma"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Turma'"
    :saving="saving"
    :width="520"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Ano Letivo *</label>
        <q-input
          :model-value="form.anoLetivo"
          @update:model-value="$emit('update:form', { ...form, anoLetivo: Number($event) })"
          type="number"
          outlined
          dense
          placeholder="Ex: 2024"
          class="lib-form-field"
          :error="!!errors.anoLetivo"
          :error-message="errors.anoLetivo"
        />
      </div>
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Série *</label>
        <q-input
          :model-value="form.serie"
          @update:model-value="$emit('update:form', { ...form, serie: $event })"
          outlined
          dense
          placeholder="Ex: 1A"
          class="lib-form-field"
          :error="!!errors.serie"
          :error-message="errors.serie"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <label class="lib-form-label">Curso *</label>
      <q-select
        :model-value="form.idCurso"
        @update:model-value="$emit('update:form', { ...form, idCurso: $event })"
        :options="cursoOptions"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        outlined
        dense
        placeholder="Selecione a matéria"
        class="lib-form-field"
        :error="!!errors.idCurso"
        :error-message="errors.idCurso"
      />
    </div>

    <div class="q-mb-md">
      <label class="lib-form-label">Matérias</label>
      <q-select
        :model-value="form.materiasIds"
        @update:model-value="$emit('update:form', { ...form, materiasIds: $event })"
        :options="materiaOptions"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        multiple
        use-chips
        outlined
        dense
        placeholder="Selecione as matérias"
        class="lib-form-field"
        :error="!!errors.materiasIds"
        :error-message="errors.materiasIds"
      />
    </div>

    <div>
      <label class="lib-form-label">Campus *</label>
      <q-select
        :model-value="form.idCampus"
        @update:model-value="$emit('update:form', { ...form, idCampus: $event })"
        :options="campusOptions"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        outlined
        dense
        placeholder="Selecione o campus"
        class="lib-form-field"
        :error="!!errors.idCampus"
        :error-message="errors.idCampus"
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
  cursoOptions: Array,
  campusOptions: Array,
  materiaOptions: Array,
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
