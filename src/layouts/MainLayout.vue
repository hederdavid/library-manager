<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-drawer v-model="leftDrawerOpen" show-if-above :width="280" class="custom-drawer">
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
            to="/dashboard"
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="dashboard" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Dashboard </q-item-section>
            <q-item-section side>
              <q-icon
                name="chevron_right"
                color="white"
                size="16px"
                v-if="$route.path === '/dashboard'"
              />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/loans" active-class="menu-item--active" class="menu-item">
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="swap_horiz" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Empréstimos </q-item-section>
            <q-item-section side>
              <q-icon
                name="chevron_right"
                color="white"
                size="16px"
                v-if="$route.path === '/loans'"
              />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-item">
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
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="domain" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Turmas </q-item-section>
            <q-item-section side>
              <q-icon
                name="chevron_right"
                color="white"
                size="16px"
                v-if="$route.path === '/turmas'"
              />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-item">
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
            to="/cursos"
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="bookmark" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Matérias </q-item-section>
            <q-item-section side>
              <q-icon
                name="chevron_right"
                color="white"
                size="16px"
                v-if="$route.path === '/cursos'"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="menu-label q-mt-md">ADMINISTRAÇÃO</div>
        <q-list class="menu-list">
          <q-item
            clickable
            v-ripple
            to="/campus"
            active-class="menu-item--active"
            class="menu-item"
          >
            <q-item-section avatar class="item-icon-section">
              <div class="icon-box">
                <q-icon name="location_city" size="20px" />
              </div>
            </q-item-section>
            <q-item-section class="item-text"> Campus </q-item-section>
            <q-item-section side>
              <q-icon
                name="chevron_right"
                color="white"
                size="16px"
                v-if="$route.path === '/campus'"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="drawer-footer">
        <div class="admin-block">
          <div class="admin-avatar">AD</div>
          <div class="admin-info">
            <div class="admin-name">Administrador</div>
            <div class="admin-email">admin@ifba.edu.br</div>
          </div>
          <q-icon name="notifications_none" color="white" size="18px" class="q-ml-sm opacity-70" />
        </div>

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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const leftDrawerOpen = ref(true)
const router = useRouter()
const $q = useQuasar()

const logout = () => {
  $q.notify({
    message: 'Saindo...',
    color: 'info',
    icon: 'info',
  })
  router.push('/login')
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
  height: calc(100% - 280px);
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

.admin-block {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
}

.admin-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #50aa6c;
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.admin-info {
  flex: 1;
}

.admin-name {
  font-size: 13px;
  font-weight: 600;
  color: white;
  line-height: 1.2;
}

.admin-email {
  font-size: 11px;
  color: #a5d6a7;
}

.opacity-70 {
  opacity: 0.7;
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
</style>
