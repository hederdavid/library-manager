export const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            user: { id: 1, name: 'Admin', email: email },
            token: 'mock-jwt-token-12345',
          })
        } else {
          reject(new Error('Email e senha são obrigatórios'))
        }
      }, 1000)
    })
  },
  logout: () => {
    return new Promise((resolve) => setTimeout(resolve, 500))
  },
}
