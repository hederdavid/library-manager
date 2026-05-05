<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent>
    <q-card class="lib-dialog" style="width: 520px; max-width: 95vw">
      <q-card-section class="row items-center q-pb-none q-pt-lg q-px-lg">
        <div>
          <div class="text-h6 text-weight-bold text-main">{{ editingId ? 'Editar Turma' : 'Nova Turma' }}</div>
          <div class="text-caption text-muted q-mt-xs">Preencha os dados da turma</div>
        </div>
        <q-space />
        <q-btn flat round dense icon="close" color="grey-6" @click="$emit('close')" />
      </q-card-section>

      <q-separator class="q-mt-md" />

      <q-card-section class="q-pa-lg">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm-6">
            <label class="lib-form-label">Ano Letivo *</label>
            <q-input
              :model-value="form.anoLetivo"
              @update:model-value="$emit('update:form', { ...form, anoLetivo: Number($event) })"
              type="number"
              outlined dense
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
              outlined dense
              placeholder="Ex: 1A"
              class="lib-form-field"
              :error="!!errors.serie"
              :error-message="errors.serie"
            />
          </div>
        </div>

        <div class="q-mb-md">
          <label class="lib-form-label">Matéria / Curso *</label>
          <q-select
            :model-value="form.idCurso"
            @update:model-value="$emit('update:form', { ...form, idCurso: $event })"
            :options="cursoOptions"
            option-value="value"
            option-label="label"
            emit-value map-options
            outlined dense
            placeholder="Selecione a matéria"
            class="lib-form-field"
            :error="!!errors.idCurso"
            :error-message="errors.idCurso"
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
            emit-value map-options
            outlined dense
            placeholder="Selecione o campus"
            class="lib-form-field"
            :error="!!errors.idCampus"
            :error-message="errors.idCampus"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none">
        <q-btn flat label="Cancelar" color="grey-7" @click="$emit('close')" />
        <q-btn
          unelevated color="primary"
          :label="editingId ? 'Salvar Alterações' : 'Criar Turma'"
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
  cursoOptions: Array,
  campusOptions: Array
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
