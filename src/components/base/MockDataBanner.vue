<template>
  <q-banner v-if="show" rounded class="mock-data-banner q-mb-md">
    <template v-slot:avatar>
      <q-icon name="science" color="orange-8" />
    </template>
    {{ message }}
  </q-banner>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: true },
  message: {
    type: String,
    default: 'Dados demonstrativos: esta tela ainda aguarda integração com o backend.',
  },
})
</script>

<style lang="scss" scoped>
.mock-data-banner {
  background: $badge-orange-bg;
  color: $badge-orange-text;
  border: 1px solid rgba(#ff9800, 0.22);
  font-weight: 600;
}
</style>
