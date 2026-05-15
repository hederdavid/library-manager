import http from './http'
import { mockConfig } from './mockConfig'

const mockUser = {
  nome: 'Administrador',
  email: 'admin@ifba.edu.br',
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

export default {
  async login(credentials) {
    if (mockConfig.usarMockAutenticacao) {
      await wait()
      return {
        usuario: mockUser,
        email: credentials.email,
      }
    }

    return http.post('/auth/login', credentials)
  },

  async logout() {
    if (mockConfig.usarMockAutenticacao) {
      await wait()
      return null
    }

    return http.post('/auth/logout')
  },

  async me() {
    if (mockConfig.usarMockAutenticacao) {
      return mockUser
    }

    return http.get('/auth/me')
  },
}
