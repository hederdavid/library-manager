import http from './http'

export default {
  findAll: () => http.get('/curso'),
  findById: (id) => http.get(`/curso/${id}`),
  create: (data) => http.post('/curso', data),
  update: (id, data) => http.put(`/curso/${id}`, data),
  remove: (id) => http.delete(`/curso/${id}`),
}
