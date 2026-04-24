export const dashboardService = {
  getStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalBooks: { value: 14, change: '+3 este mês', available: 8 },
          activeLoans: { value: 6, change: '+5 esta semana', registeredStudents: 12 },
          overdueReturns: { value: 5, status: 'Crítico', action: 'requerem atenção imediata' },
          pendingStudents: { value: 5, action: 'Verificar', totalStudents: 12 },
        })
      }, 1200)
    })
  },
  getMonthlyMovements: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { month: 'Jan', loans: 40, returns: 35 },
          { month: 'Fev', loans: 45, returns: 38 },
          { month: 'Mar', loans: 55, returns: 50 },
          { month: 'Abr', loans: 60, returns: 55 },
          { month: 'Mai', loans: 70, returns: 65 },
          { month: 'Jun', loans: 85, returns: 80 },
        ])
      }, 1500)
    })
  },
}
