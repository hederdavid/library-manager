<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent>
    <q-card class="lib-dialog" style="width: 560px; max-width: 95vw">
      <q-card-section class="row items-center q-pb-none q-pt-lg q-px-lg">
        <div>
          <div class="text-h6 text-weight-bold text-main">{{ editingId ? 'Editar Aluno' : 'Novo Aluno' }}</div>
          <div class="text-caption text-muted q-mt-xs">Preencha os dados do aluno</div>
        </div>
        <q-space />
        <q-btn flat round dense icon="close" color="grey-6" @click="$emit('close')" />
      </q-card-section>

      <q-separator class="q-mt-md" />

      <q-card-section class="q-pa-lg">
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
            <q-input
              :model-value="form.turma"
              @update:model-value="$emit('update:form', { ...form, turma: $event })"
              outlined
              dense
              placeholder="Ex: 1A - 2024"
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
          <div class="col-12 col-sm-4">
            <label class="lib-form-label">Status</label>
            <q-select
              :model-value="form.status"
              @update:model-value="$emit('update:form', { ...form, status: $event })"
              :options="['Ativo', 'Pendente', 'Inativo']"
              outlined
              dense
              class="lib-form-field"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none">
        <q-btn flat label="Cancelar" color="grey-7" @click="$emit('close')" />
        <q-btn
          unelevated
          color="primary"
          :label="editingId ? 'Salvar Alterações' : 'Criar Aluno'"
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
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])
</script>
