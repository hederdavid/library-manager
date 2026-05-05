<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent>
    <q-card class="lib-dialog" style="width: 480px; max-width: 95vw">
      <q-card-section class="row items-center q-pb-none q-pt-lg q-px-lg">
        <div>
          <div class="text-h6 text-weight-bold text-main">{{ editingId ? 'Editar Matéria' : 'Nova Matéria' }}</div>
          <div class="text-caption text-muted q-mt-xs">Preencha o nome da matéria / curso</div>
        </div>
        <q-space />
        <q-btn flat round dense icon="close" color="grey-6" @click="$emit('close')" />
      </q-card-section>

      <q-separator class="q-mt-md" />

      <q-card-section class="q-pa-lg">
        <label class="lib-form-label">Nome da Matéria *</label>
        <q-input
          :model-value="form.nome_curso"
          @update:model-value="$emit('update:form', { ...form, nome_curso: $event })"
          outlined dense
          placeholder="Ex: Programação Orientada a Objetos"
          class="lib-form-field"
          :error="!!errors.nome_curso"
          :error-message="errors.nome_curso"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none">
        <q-btn flat label="Cancelar" color="grey-7" @click="$emit('close')" />
        <q-btn
          unelevated color="primary"
          :label="editingId ? 'Salvar Alterações' : 'Criar Matéria'"
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
  saving: Boolean
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
