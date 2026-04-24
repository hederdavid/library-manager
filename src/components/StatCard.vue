<template>
  <div class="stat-card">
    <div class="stat-header">
      <div class="icon-box" :class="`icon-box--${theme}`">
        <q-icon :name="icon" size="24px" />
      </div>
      <div v-if="changeText" class="trend-badge" :class="`trend-badge--${theme}`">
        <q-icon :name="changeIcon" size="14px" class="q-mr-xs" />
        <span>{{ changeText }}</span>
      </div>
    </div>

    <div class="stat-body">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-title">{{ title }}</div>
      <div class="stat-desc">{{ description }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  description: String,
  icon: String,
  theme: {
    type: String,
    default: 'green',
  },
  changeText: String,
  changeIcon: {
    type: String,
    default: 'trending_up',
  },
})
</script>

<style lang="scss" scoped>
.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid $border;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--green {
    background: rgba($primary, 0.1);
    color: $primary;
  }
  &--blue {
    background: rgba($secondary, 0.1);
    color: $secondary;
  }
  &--red {
    background: rgba($negative, 0.1);
    color: $negative;
  }
  &--orange {
    background: rgba($warning, 0.1);
    color: $warning;
  }
}

.trend-badge {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;

  &--green {
    color: $primary;
  }
  &--blue {
    color: $secondary;
  }
  &--red {
    color: $negative;
  }
  &--orange {
    color: $warning;
  }
}

.stat-body {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
  color: $text-main;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 15px;
  font-weight: 600;
  color: $text-main;
  margin-bottom: 2px;
}

.stat-desc {
  font-size: 12px;
  color: $text-muted;
}
</style>
