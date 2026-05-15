<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card class="lib-dialog base-form-dialog" :style="dialogStyle">
      <q-card-section class="row items-center q-pb-none q-pt-lg q-px-lg">
        <div>
          <div class="text-h6 text-weight-bold text-main">{{ title }}</div>
          <div v-if="subtitle" class="text-caption text-muted q-mt-xs">{{ subtitle }}</div>
        </div>
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="close"
          color="grey-6"
          :disable="saving"
          @click="$emit('close')"
        />
      </q-card-section>

      <q-separator class="q-mt-md" />

      <q-card-section class="q-pa-lg">
        <slot />
      </q-card-section>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none">
        <q-btn flat :label="cancelLabel" color="grey-7" :disable="saving" @click="$emit('close')" />
        <q-btn
          unelevated
          color="primary"
          :label="submitLabel"
          :loading="saving"
          class="lib-action-btn"
          @click="$emit('save')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  submitLabel: { type: String, default: 'Salvar' },
  cancelLabel: { type: String, default: 'Cancelar' },
  width: { type: [Number, String], default: 520 },
  saving: { type: Boolean, default: false },
})

defineEmits(['update:modelValue', 'close', 'save'])

const dialogStyle = computed(() => {
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return { width, maxWidth: '95vw' }
})
</script>
