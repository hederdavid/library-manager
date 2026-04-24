<template>
  <div class="login-form">
    <div class="login-form__header">
      <h2 class="login-form__title">Bem-vindo</h2>
      <p class="login-form__subtitle">Faça login para acessar o sistema</p>
    </div>

    <q-form @submit.prevent="onSubmit" class="login-form__body">
      <div class="login-form__field">
        <label class="login-form__label">E-mail Institucional</label>
        <q-input
          v-model="email"
          type="email"
          placeholder="seu@ifba.edu.br"
          outlined
          dense
          color="primary"
          class="custom-input"
          :disable="loading"
        >
          <template v-slot:prepend>
            <q-icon name="mail_outline" color="grey-6" size="20px" />
          </template>
        </q-input>
      </div>

      <div class="login-form__field">
        <div class="login-form__field-header">
          <label class="login-form__label">Senha</label>
          <a href="#" class="login-form__forgot">Esqueci minha senha</a>
        </div>
        <q-input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          outlined
          dense
          color="primary"
          class="custom-input"
          :disable="loading"
        >
          <template v-slot:prepend>
            <q-icon name="lock_outline" color="grey-6" size="20px" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              color="grey-6"
              size="20px"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>

      <q-btn
        type="submit"
        label="Entrar"
        icon="login"
        color="primary"
        class="login-form__btn q-mt-sm"
        unelevated
        no-caps
        :loading="loading"
      />
    </q-form>

    <div class="login-form__footer">
      <p>Problemas para acessar? Entre em contato com a <strong>TI do IFBA</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

defineProps({
  loading: Boolean,
})

const emit = defineEmits(['submit'])

const onSubmit = () => {
  emit('submit', { email: email.value, password: password.value })
}
</script>

<style lang="scss" scoped>
.login-form {
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 460px;
  border: 1px solid $border;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: $secondary;
  }

  &__subtitle {
    margin: 0;
    font-size: 16px;
    color: $text-muted;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: $text-muted;
  }

  &__forgot {
    font-size: 13px;
    font-weight: 500;
    color: $primary;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__btn {
    height: 48px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
  }

  &__footer {
    border-top: 1px solid $border;
    padding-top: 24px;
    text-align: center;
    font-size: 14px;
    color: $text-light;

    strong {
      color: $text-muted;
    }
  }
}

:deep(.custom-input) {
  .q-field__control {
    border-radius: 12px !important;
    background: $bg-input;
    height: 48px;

    &:before {
      border-color: $border-input !important;
    }

    &:hover:before {
      border-color: #d1d5db !important;
    }
  }

  .q-field__native {
    font-size: 15px;
    color: $text-main;
  }
}
</style>
