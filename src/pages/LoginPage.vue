<template>
  <q-page class="flex flex-center">
    <LoginForm :loading="loading" @submit="handleLogin" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import LoginForm from 'src/components/LoginForm.vue'
import authService from 'src/services/authService'

const router = useRouter()
const $q = useQuasar()
const loading = ref(false)

const handleLogin = async (credentials) => {
  loading.value = true
  try {
    // Simulando um delay de requisição para dar o efeito de login
    await new Promise(resolve => setTimeout(resolve, 500))
    // await authService.login(credentials.email, credentials.password)
    
    $q.notify({
      color: 'positive',
      position: 'top-right',
      message: 'Login realizado com sucesso!',
      icon: 'check_circle',
    })
    router.push('/dashboard')
  } catch (error) {
    $q.notify({
      color: 'negative',
      position: 'top-right',
      message: error.message || 'Erro ao realizar login',
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
