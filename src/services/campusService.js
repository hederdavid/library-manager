import http from './http'

export default {
  findAll: () => http.get('/campus'),
  findById: (id) => http.get(`/campus/${id}`),
  create: (data) => http.post('/campus', data),
  update: (id, data) => http.put(`/campus/${id}`, data),
  remove: (id) => http.delete(`/campus/${id}`),
}
