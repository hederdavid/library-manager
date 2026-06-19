<template>
  <BaseFormDialog
    :model-value="modelValue"
    :title="editingId ? 'Editar Estoque' : 'Novo Estoque'"
    subtitle="Controle de quantidades do livro"
    :submit-label="editingId ? 'Salvar Alterações' : 'Criar Estoque'"
    :saving="saving"
    :width="650"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
    @save="$emit('save')"
  >
    <div class="q-mb-lg" v-if="!editingId">
      <label class="lib-form-label">Livro vinculado *</label>
      <q-select
        :model-value="form.livroId"
        @update:model-value="$emit('update:form', { ...form, livroId: $event })"
        outlined
        dense
        use-input
        emit-value
        map-options
        input-debounce="300"
        placeholder="Buscar livro por título ou disciplina..."
        :options="filteredLivros"
        class="lib-form-field"
        :error="!!errors.livroId"
        :error-message="errors.livroId"
        @filter="filterLivros"
      >
        <template v-slot:prepend>
          <q-icon name="search" size="20px" color="grey-6" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-muted"> Nenhum livro encontrado </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Quantidade Total *</label>
        <q-input
          :model-value="form.qtdTotal"
          @update:model-value="$emit('update:form', { ...form, qtdTotal: Number($event) || 0 })"
          outlined
          dense
          type="number"
          placeholder="Ex: 50"
          class="lib-form-field"
          :error="!!errors.qtdTotal"
          :error-message="errors.qtdTotal"
        />
      </div>
      <div class="col-12 col-sm-6">
        <label class="lib-form-label">Quantidade Disponível *</label>
        <q-input
          :model-value="form.qtdDisponivel"
          @update:model-value="$emit('update:form', { ...form, qtdDisponivel: Number($event) || 0 })"
          outlined
          dense
          type="number"
          placeholder="Ex: 50"
          class="lib-form-field"
          :error="!!errors.qtdDisponivel"
          :error-message="errors.qtdDisponivel"
        />
      </div>
    </div>

    <q-separator class="q-mb-md" />
    <div class="text-subtitle2 text-weight-bold text-main q-mb-md">
      Subdivisão por Condição Física
    </div>

    <div class="row q-col-gutter-md q-mb-sm">
      <div class="col-12 col-sm-3">
        <label class="lib-form-label">Novo</label>
        <q-input
          :model-value="form.qtdNovo"
          @update:model-value="$emit('update:form', { ...form, qtdNovo: Number($event) || 0 })"
          outlined
          dense
          type="number"
          class="lib-form-field"
          :error="!!errors.condicoes"
        />
      </div>
      <div class="col-12 col-sm-3">
        <label class="lib-form-label">Conservado</label>
        <q-input
          :model-value="form.qtdConservado"
          @update:model-value="$emit('update:form', { ...form, qtdConservado: Number($event) || 0 })"
          outlined
          dense
          type="number"
          class="lib-form-field"
          :error="!!errors.condicoes"
        />
      </div>
      <div class="col-12 col-sm-3">
        <label class="lib-form-label">Mal Conserv.</label>
        <q-input
          :model-value="form.qtdMalConservado"
          @update:model-value="
            $emit('update:form', { ...form, qtdMalConservado: Number($event) || 0 })
          "
          outlined
          dense
          type="number"
          class="lib-form-field"
          :error="!!errors.condicoes"
        />
      </div>
      <div class="col-12 col-sm-3">
        <label class="lib-form-label">Inutilizado</label>
        <q-input
          :model-value="form.qtdInutilizado"
          @update:model-value="
            $emit('update:form', { ...form, qtdInutilizado: Number($event) || 0 })
          "
          outlined
          dense
          type="number"
          class="lib-form-field"
          :error="!!errors.condicoes"
        />
      </div>
    </div>

    <div v-if="errors.condicoes" class="text-negative text-caption q-mt-xs q-mb-md">
      {{ errors.condicoes }}
    </div>
  </BaseFormDialog>
</template>

<script setup>
import { ref } from 'vue'
import BaseFormDialog from 'src/components/base/BaseFormDialog.vue'

const props = defineProps({
  modelValue: Boolean,
  editingId: [Number, String, null],
  form: Object,
  errors: Object,
  saving: Boolean,
  livroOptions: { type: Array, default: () => [] },
})

defineEmits(['update:modelValue', 'update:form', 'close', 'save'])

const filteredLivros = ref(props.livroOptions)

function filterLivros(val, update) {
  update(() => {
    const needle = val.toLowerCase()
    filteredLivros.value = props.livroOptions.filter((opt) =>
      opt.label.toLowerCase().includes(needle),
    )
  })
}
</script>
