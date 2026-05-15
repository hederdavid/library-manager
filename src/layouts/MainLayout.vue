<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-drawer v-model="leftDrawerOpen" :width="280" class="custom-drawer">
      <div class="sidebar-header">
        <div class="logo-box">
          <q-icon name="school" color="white" size="24px" />
        </div>
        <div class="brand">
          <span class="inst">IFBA</span>
          <span class="sys">SISTEMA DE BIBLIOTECA</span>
        </div>
      </div>

      <q-scroll-area class="drawer-content">
        <div class="menu-label">MENU PRINCIPAL</div>
        <q-list class="menu-list">
          <q-item
            clickable
            v-ripple
            to="/painel"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="dashboard" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Painel </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/emprestimos"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="swap_horiz" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Empréstimos </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/alunos"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="people" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Alunos </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/turmas"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="domain" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Turmas </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/livros"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="menu_book" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Livros </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/materias"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="bookmark" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Matérias </q-item-section>
          </q-item>
        </q-list>

        <div class="menu-label q-mt-md">ADMINISTRAÇÃO</div>
        <q-list class="menu-list">
          <q-item
            clickable
            v-ripple
            to="/campus"
            exact
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="location_city" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Campus </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="drawer-footer">
        <q-item clickable v-ripple class="logout-item" @click="logout">
          <q-item-section avatar class="item-icon-section">
            <div class="icon-box">
              <q-icon name="logout" size="20px" />
            </div>
          </q-item-section>
          <q-item-section class="logout-text"> Sair do sistema </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container class="bg-light-page">
      <header class="app-header">
        <div class="app-header__title-row">
          <q-btn
            round
            flat
            color="primary"
            :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
            :aria-label="leftDrawerOpen ? 'Esconder menu lateral' : 'Mostrar menu lateral'"
            class="app-header__menu-btn"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <div class="app-header__title-block">
            <h1 class="text-h4 text-weight-bold text-main q-ma-none">{{ pageTitle }}</h1>
            <p v-if="pageSubtitle" class="text-subtitle2 text-muted q-mt-xs q-mb-none">
              {{ pageSubtitle }}
            </p>
          </div>
        </div>

        <div class="app-header__actions">
          <q-btn round flat class="app-header__notif-btn" aria-label="Notificações">
            <q-icon name="notifications_none" size="20px" />
            <q-badge
              v-if="unreadNotificationsCount"
              color="negative"
              floating
              rounded
              class="notification-badge"
            >
              {{ unreadNotificationsCount }}
            </q-badge>

            <q-menu
              anchor="bottom right"
              self="top right"
              :offset="[0, 10]"
              class="notifications-menu"
            >
              <div class="notifications-menu__header">
                <div>
                  <div class="notifications-menu__title">Notificações</div>
                  <div class="notifications-menu__subtitle">
                    {{ unreadNotificationsCount }} não lida{{
                      unreadNotificationsCount !== 1 ? 's' : ''
                    }}
                  </div>
                </div>
                <q-btn
                  flat
                  round
                  dense
                  icon="done_all"
                  color="primary"
                  aria-label="Marcar todas como lidas"
                />
              </div>

              <q-separator />

              <q-list separator class="notifications-menu__list">
                <q-item
                  v-for="notification in notifications"
                  :key="notification.id"
                  clickable
                  v-close-popup
                  class="notification-item"
                >
                  <q-item-section avatar>
                    <q-avatar :color="notification.color" text-color="white" size="36px">
                      <q-icon :name="notification.icon" size="18px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="notification-item__title">
                      {{ notification.title }}
                    </q-item-label>
                    <q-item-label caption lines="2">
                      {{ notification.message }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label caption>{{ notification.time }}</q-item-label>
                    <q-badge v-if="notification.unread" rounded color="primary" class="q-mt-sm" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <div class="app-header__profile">
            <q-avatar
              size="40px"
              font-size="15px"
              color="primary"
              text-color="white"
              class="text-weight-bold"
            >
              AD
            </q-avatar>
            <div class="app-header__profile-text">
              <div class="admin-name">Administrador</div>
              <div class="admin-email">admin@ifba.edu.br</div>
            </div>
          </div>
        </div>
      </header>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/composables/useNotify'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const notify = useNotify()
const leftDrawerOpen = ref($q.screen.gt.sm)
const pageTitle = computed(() => route.meta.title || 'IFBA')
const pageSubtitle = computed(() => route.meta.subtitle || '')
const notifications = ref([
  {
    id: 1,
    title: 'Devolução em atraso',
    message: '5 empréstimos precisam de acompanhamento hoje.',
    time: 'Agora',
    icon: 'report_problem',
    color: 'negative',
    unread: true,
  },
  {
    id: 2,
    title: 'Empréstimos ativos',
    message: '6 livros estão atualmente emprestados.',
    time: 'Hoje',
    icon: 'schedule',
    color: 'primary',
    unread: true,
  },
  {
    id: 3,
    title: 'Histórico atualizado',
    message: '10 movimentações recentes foram registradas.',
    time: 'Ontem',
    icon: 'text_snippet',
    color: 'grey-7',
    unread: false,
  },
])
const unreadNotificationsCount = computed(
  () => notifications.value.filter((notification) => notification.unread).length,
)

const logout = () => {
  notify.info('Saindo...')
  router.push('/entrar')
}
</script>

<style lang="scss">
.custom-drawer {
  background-color: $ifba-darker !important;
  color: white !important;
}
</style>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
}

.bg-light-page {
  background-color: $bg-light;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding: 48px 48px 24px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.app-header__title-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
}

.app-header__menu-btn {
  flex: 0 0 auto;
  margin-top: -4px;
}

.app-header__title-block {
  min-width: 0;

  h1 {
    font-size: 24px;
    line-height: 1.2;
  }
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  min-height: 44px;
}

.app-header__notif-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white !important;
  border: 1px solid $border;
  box-shadow: none !important;
  color: #64748b;

  &:hover {
    background: $bg-input !important;
    color: $primary;
  }
}

.notification-badge {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid white;
  top: 6px;
  right: 5px;
}

.notifications-menu {
  width: min(360px, calc(100vw - 32px));
  border-radius: 14px;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.16);
  overflow: hidden;
}

.notifications-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
}

.notifications-menu__title {
  font-size: 15px;
  font-weight: 700;
  color: $text-main;
}

.notifications-menu__subtitle {
  margin-top: 2px;
  font-size: 12px;
  font-weight: 600;
  color: $text-muted;
}

.notifications-menu__list {
  max-height: 320px;
  overflow-y: auto;
}

.notification-item {
  padding: 14px 16px;
}

.notification-item__title {
  font-size: 13px;
  font-weight: 700;
  color: $text-main;
}

.app-header__profile {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 44px;
  padding: 4px 14px 4px 4px;
  border-radius: 12px;
  background: white;
  border: 1px solid $border;
  box-shadow: none;
}

.app-header__profile-text {
  line-height: 1.2;
  padding-right: 2px;
}

.sidebar-header {
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;

  .logo-box {
    background-color: rgba(255, 255, 255, 0.1);
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .brand {
    text-align: center;
    .inst {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
      line-height: 1.1;
    }
    .sys {
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #92c3a5;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
  }
}

.drawer-content {
  height: calc(100% - 220px);
}

.menu-label {
  font-size: 11px;
  font-weight: 700;
  color: $accent;
  padding: 24px 24px 8px 24px;
  letter-spacing: 0.5px;
}

.menu-list {
  padding: 0 16px;
}

.menu-item {
  border-radius: 12px;
  margin-bottom: 4px;
  padding: 8px 12px;
  min-height: 48px;
  color: rgba(255, 255, 255, 0.85);

  .item-icon-section {
    min-width: 0;
    padding-right: 12px;

    .icon-box {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }
  }

  .item-text {
    font-size: 14px;
    font-weight: 500;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &--active {
    background: #397b4f;
    color: white;

    .item-text {
      font-weight: 600;
    }

    .icon-box {
      background: #50aa6c;
    }
  }
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-name {
  font-size: 13px;
  font-weight: 600;
  color: $text-main;
  line-height: 1.2;
}

.admin-email {
  font-size: 11px;
  color: $text-muted;
}

.logout-item {
  border-radius: 12px;
  min-height: 44px;
  padding: 4px 12px;

  .item-icon-section {
    min-width: 0;
    padding-right: 12px;

    .icon-box {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .logout-text {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}

@media (max-width: 700px) {
  .app-header {
    padding: 24px 20px 18px;
    align-items: stretch;
    flex-direction: column;
    gap: 16px;
  }

  .app-header__actions {
    justify-content: space-between;
  }

  .app-header__profile {
    min-width: 0;
  }

  .app-header__profile-text {
    display: none;
  }
}
</style>
