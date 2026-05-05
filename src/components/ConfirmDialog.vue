<template>
  <q-dialog v-model="show" persistent>
    <q-card class="confirm-card">
      <q-btn
        flat
        round
        dense
        icon="close"
        class="close-btn"
        color="grey-5"
        @click="cancel"
      />

      <q-card-section class="content-section">
        <div class="icon-wrap" :class="`icon-wrap--${iconTheme}`">
          <q-icon :name="icon" size="28px" />
        </div>

        <div class="text-h6 text-weight-bold text-main q-mt-md">{{ title }}</div>
        <div class="text-body2 text-muted q-mt-sm message" v-html="message" />
      </q-card-section>

      <q-separator />

      <q-card-actions class="actions-row">
        <q-btn
          flat
          :label="cancelLabel"
          color="grey-7"
          class="cancel-btn"
          :disable="loading"
          @click="cancel"
        />
        <q-btn
          unelevated
          :label="confirmLabel"
          :color="confirmColor"
          :loading="loading"
          class="confirm-btn"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: 'Confirmar' },
  message: { type: String, default: 'Tem certeza que deseja continuar?' },
  icon: { type: String, default: 'delete_outline' },
  iconTheme: { type: String, default: 'red' },
  confirmLabel: { type: String, default: 'Confirmar' },
  cancelLabel: { type: String, default: 'Cancelar' },
  confirmColor: { type: String, default: 'negative' },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function cancel() {
  emit('cancel')
  show.value = false
}
</script>

<style lang="scss" scoped>
.confirm-card {
  width: 400px;
  max-width: 92vw;
  border-radius: 20px;
  position: relative;
  overflow: visible;
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 32px 28px;
}

.icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--red {
    background: $badge-red-bg;
    color: $badge-red-text;
  }
  &--green {
    background: $badge-green-bg;
    color: $badge-green-text;
  }
  &--blue {
    background: $badge-blue-bg;
    color: $badge-blue-text;
  }
  &--orange {
    background: $badge-orange-bg;
    color: $badge-orange-text;
  }
}

.text-main { color: $text-main; }
.text-muted { color: $text-muted; }

.message {
  max-width: 280px;
  line-height: 1.6;
}

.actions-row {
  display: flex;
  justify-content: stretch;
  gap: 10px;
  padding: 16px 24px;
}

.cancel-btn {
  flex: 1;
  border-radius: 10px;
  height: 44px;
  font-weight: 600;
  border: 1px solid $border-input;
}

.confirm-btn {
  flex: 1;
  border-radius: 10px;
  height: 44px;
  font-weight: 600;
}
</style>
