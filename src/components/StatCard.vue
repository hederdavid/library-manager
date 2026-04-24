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
      <div class="stat-value" :class="`text-theme--${theme}`">{{ value }}</div>
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
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

.trend-badge {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;

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
    background: $badge-red-bg;
    color: $badge-red-text;
  }
}

.stat-body {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

.stat-value {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;

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
  font-size: 15px;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 2px;
}

.stat-desc {
  font-size: 12px;
  color: $text-muted;
  font-weight: 500;
}
</style>
