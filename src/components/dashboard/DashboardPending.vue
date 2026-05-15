<template>
  <div class="row q-col-gutter-lg">
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
          <q-badge unelevated class="header-badge header-badge--danger"> 5 atrasos </q-badge>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list class="custom-list">
            <q-item v-for="i in 3" :key="i" class="list-item">
              <q-item-section avatar>
                <div class="days-badge bg-red-1 text-negative">13d</div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-main list-item-title"
                  >Maria Fernanda Santos</q-item-label
                >
                <q-item-label caption class="text-muted">Algoritmos: Teoria e Prática</q-item-label>
              </q-item-section>
              <q-item-section side class="items-end">
                <q-item-label class="text-weight-bold text-negative opacity-80"
                  >13 dias atraso</q-item-label
                >
                <q-item-label caption>Venceu: 10/03</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

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
          <q-badge unelevated class="header-badge header-badge--success"> 1 devol. </q-badge>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list class="custom-list">
            <q-item class="list-item">
              <q-item-section avatar>
                <div class="days-badge bg-green-1 text-primary">8d</div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-main list-item-title"
                  >João Pedro Silva</q-item-label
                >
                <q-item-label caption class="text-muted text-ellipsis pending-book-title"
                  >Programação Orientada a Objetos - INF-013</q-item-label
                >
              </q-item-section>
              <q-item-section side class="items-end">
                <q-item-label caption class="text-weight-bold text-primary">01/04</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

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
