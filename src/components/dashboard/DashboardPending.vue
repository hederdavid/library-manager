<template>
  <div class="row q-col-gutter-lg">
    <!-- Empréstimos Atrasados -->
    <div class="col-12 col-md-7">
      <q-card flat bordered class="list-card">
        <q-card-section class="list-header">
          <div class="flex items-center gap-sm">
            <div class="header-icon-box bg-red-1">
              <q-icon name="report_problem" color="negative" size="20px" />
            </div>
            <div>
              <div class="text-subtitle1 text-weight-bold text-main">Empréstimos Atrasados</div>
              <div class="text-caption text-muted">Ação necessária</div>
            </div>
          </div>
          <q-badge unelevated class="header-badge header-badge--danger">
            {{ overdueLoans.length }} atrasos
          </q-badge>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="overdueLoans.length === 0" class="text-center text-muted q-py-lg">
            Nenhum empréstimo atrasado.
          </div>
          <q-list v-else class="custom-list">
            <q-item v-for="item in overdueLoans" :key="item.id" class="list-item">
              <q-item-section avatar>
                <div class="days-badge bg-red-1 text-negative">{{ item.daysOverdue }}d</div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-main list-item-title">
                  {{ item.studentName }}
                </q-item-label>
                <q-item-label caption class="text-muted text-ellipsis">
                  {{ item.bookTitle }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="items-end">
                <q-item-label class="text-weight-bold text-negative opacity-80">
                  {{ item.daysOverdue }} dias de atraso
                </q-item-label>
                <q-item-label caption>Venceu: {{ item.dueDate }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Próximas Devoluções -->
    <div class="col-12 col-md-5">
      <q-card flat bordered class="list-card">
        <q-card-section class="list-header">
          <div class="flex items-center gap-sm">
            <div class="header-icon-box bg-green-1">
              <q-icon name="calendar_today" color="primary" size="20px" />
            </div>
            <div>
              <div class="text-subtitle1 text-weight-bold text-main">Próximas Devoluções</div>
              <div class="text-caption text-muted">Próximos 10 dias</div>
            </div>
          </div>
          <q-badge unelevated class="header-badge header-badge--success">
            {{ upcomingReturns.length }} devol.
          </q-badge>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="upcomingReturns.length === 0" class="text-center text-muted q-py-lg">
            Nenhuma devolução próxima.
          </div>
          <q-list v-else class="custom-list">
            <q-item v-for="item in upcomingReturns" :key="item.id" class="list-item">
              <q-item-section avatar>
                <div class="days-badge bg-green-1 text-primary">{{ item.daysLeft }}d</div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-main list-item-title">
                  {{ item.studentName }}
                </q-item-label>
                <q-item-label caption class="text-muted text-ellipsis pending-book-title">
                  {{ item.bookTitle }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="items-end">
                <q-item-label caption class="text-weight-bold text-primary">
                  {{ item.dueDate }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stats: Object,
})

const overdueLoans = computed(() => {
  return props.stats?.overdueLoans || []
})

const upcomingReturns = computed(() => {
  return props.stats?.upcomingReturns || []
})
</script>

<style lang="scss" scoped>
.list-card {
  background: white;
  border-radius: 20px;
  border: 1px solid $border;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
}

.header-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-badge {
  font-weight: 700;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;

  &--danger {
    background: $tag-red-bg;
    color: $tag-red-text;
    border: 1px solid rgba(#f44336, 0.22);
  }

  &--success {
    background: $tag-green-bg;
    color: $tag-green-text;
    border: 1px solid rgba(#4caf50, 0.22);
  }
}

.custom-list {
  padding: 0 16px 16px 16px;
}

.list-item {
  padding: 20px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: $bg-input;
  }
}

.days-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

.list-item-title {
  font-size: 15px;
  color: $text-main;
}

.opacity-80 {
  opacity: 0.8;
}

.pending-book-title {
  max-width: 180px;
}

.gap-sm {
  gap: 16px;
}
</style>
