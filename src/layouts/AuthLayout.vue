<template>
  <q-layout view="lHh Lpr lFf" class="auth-layout">
    <div class="auth-container">
      <div class="auth-sidebar">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>

        <div class="auth-sidebar__content">
          <div class="auth-sidebar__logo-area">
            <div class="auth-sidebar__badge">
              <q-icon name="school" color="white" size="24px" />
            </div>
            <div class="auth-sidebar__brand">
              <span class="auth-sidebar__inst">INSTITUTO FEDERAL</span>
              <span class="auth-sidebar__site">DA BAHIA — IFBA</span>
            </div>
          </div>

          <div class="auth-sidebar__hero">
            <h1 class="auth-sidebar__title">Sistema de<br />Biblioteca</h1>
            <p class="auth-sidebar__desc">
              Gestão de empréstimo e devolução de livros didáticos para a comunidade escolar do
              IFBA.
            </p>
          </div>

          <div class="auth-sidebar__stats">
            <div class="auth-sidebar__stat-item">
              <q-icon name="menu_book" size="20px" color="white" class="stat-icon" />
              <div class="auth-sidebar__stat-label">Acervo digital</div>
              <div class="auth-sidebar__stat-value">1.200+ livros</div>
            </div>
            <div class="auth-sidebar__stat-item">
              <q-icon name="school" size="20px" color="white" class="stat-icon" />
              <div class="auth-sidebar__stat-label">Alunos ativos</div>
              <div class="auth-sidebar__stat-value">850+ alunos</div>
            </div>
          </div>
        </div>

        <div class="auth-sidebar__footer">
          &copy; 2026 IFBA — Instituto Federal da Bahia. Todos os direitos reservados.
        </div>
      </div>

      <div class="auth-main">
        <q-page-container class="full-width">
          <div class="auth-main-content">
            <router-view />
            <div class="auth-main-footer">© 2026 IFBA - Sistema de Gestão de Biblioteca</div>
          </div>
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.auth-layout {
  background-color: $bg-light;
  min-height: 100vh;
}

.auth-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.auth-sidebar {
  width: 50%;
  max-width: 650px;
  background-color: $ifba-dark;
  color: white;
  padding: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  .circle-1,
  .circle-2,
  .circle-3 {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    z-index: 0;
    pointer-events: none;
  }

  .circle-1 {
    width: 600px;
    height: 600px;
    top: -200px;
    left: -200px;
  }

  .circle-2 {
    width: 700px;
    height: 700px;
    top: 30%;
    right: -300px;
  }

  .circle-3 {
    width: 500px;
    height: 500px;
    bottom: -150px;
    left: -50px;
  }

  &__content,
  &__footer {
    position: relative;
    z-index: 1;
  }

  &__badge {
    background: rgba(255, 255, 255, 0.15);
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logo-area {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 120px;
  }

  &__brand {
    display: flex;
    flex-direction: column;
  }

  &__inst {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: #a5d6a7;
    margin-bottom: 2px;
  }

  &__site {
    font-size: 20px;
    font-weight: 700;
    color: white;
    letter-spacing: 0.5px;
    line-height: 1.1;
  }

  &__hero {
    margin-bottom: 64px;
  }

  &__title {
    font-size: 42px;
    font-weight: 700;
    line-height: 1.1;
    margin: 0 0 20px 0;
  }

  &__desc {
    font-size: 16px;
    color: #a5d6a7;
    line-height: 1.6;
    margin: 0;
    max-width: 90%;
  }

  &__stats {
    display: flex;
    gap: 16px;
  }

  &__stat-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    width: 180px;
  }

  .stat-icon {
    margin-bottom: 12px;
  }

  &__stat-label {
    font-size: 11px;
    color: #c8e6c9;
    margin-bottom: 4px;
  }

  &__stat-value {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  &__footer {
    font-size: 11px;
    color: #81c784;
  }
}

.auth-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
}

.auth-main-footer {
  font-size: 13px;
  color: $text-light;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 1024px) {
  .auth-sidebar {
    display: none;
  }
}
</style>
