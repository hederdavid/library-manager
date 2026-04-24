<template>
  <div class="stat-card-mini">
    <div class="icon-box" :class="`icon-box--${theme}`">
      <q-icon :name="icon" size="24px" />
    </div>
    <div class="stat-content">
      <div class="stat-value" :class="`text-theme--${theme}`">{{ value }}</div>
      <div class="stat-title">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  theme: {
    type: String,
    default: 'green',
  },
})
</script>

<style lang="scss" scoped>
.stat-card-mini {
  background: white;
  border-radius: 16px;
  padding: 16px 24px;
  border: 1px solid $border;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--green {
    background: $badge-green-bg;
    color: $badge-green-text;
  }
  &--blue {
    background: $badge-blue-bg;
    color: $badge-blue-text;
  }
  &--red {
    background: $badge-red-bg;
    color: $badge-red-text;
  }
  &--orange {
    background: $badge-orange-bg;
    color: $badge-orange-text;
  }
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;

  &.text-theme--green {
    color: $badge-green-text;
  }
  &.text-theme--blue {
    color: $badge-blue-text;
  }
  &.text-theme--red {
    color: $badge-red-text;
  }
  &.text-theme--orange {
    color: $badge-orange-text;
  }
}

.stat-title {
  font-size: 13px;
  font-weight: 600;
  color: $text-muted;
}
</style>
