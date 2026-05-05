<template>
  <div class="row justify-between items-center q-mb-xl">
    <div>
      <h1 class="text-h4 text-weight-bold text-main q-ma-none">{{ title }}</h1>
      <p v-if="subtitle" class="text-subtitle2 text-muted q-mt-xs q-mb-none">{{ subtitle }}</p>
    </div>
    <div class="row items-center q-gutter-sm">
      <q-input
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        outlined
        dense
        placeholder="Busca rápida..."
        class="page-header__search bg-white"
        rounded
      >
        <template v-slot:prepend>
          <q-icon name="search" size="20px" color="grey-5" />
        </template>
      </q-input>
      <q-btn round flat class="page-header__notif-btn">
        <q-icon name="notifications_none" size="20px" />
      </q-btn>
      <q-avatar size="44px" font-size="16px" color="primary" text-color="white" class="text-weight-bold">
        AD
      </q-avatar>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  modelValue: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.page-header__search {
  width: 250px;
  :deep(.q-field__control) {
    border-radius: 20px;
    height: 40px;
  }
}

.page-header__notif-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
  color: #64748b;
}
</style>
