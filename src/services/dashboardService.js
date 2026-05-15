import http from './http'
import { mockConfig } from './mockConfig'

const mockStats = {
  totalBooks: { value: 14 },
  activeLoans: { value: 6 },
  overdueReturns: { value: 5 },
  pendingStudents: { value: 5 },
}

export default {
  async getStats() {
    if (mockConfig.usarMockDashboard) {
      return mockStats
    }

    return http.get('/dashboard/stats')
  },
}
