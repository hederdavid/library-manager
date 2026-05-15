import http from './http'

function toPayload(data) {
  return {
    titulo: data.titulo,
    disciplina: data.disciplina,
    anoEscolar: data.anoEscolar,
    edicao: data.edicao,
  }
}

export default {
  findAll: (filters = {}) => http.get('/livros', filters),
  findById: (id) => http.get(`/livros/${id}`),
  create: (data) => http.post('/livros', toPayload(data)),
  update: (id, data) => http.patch(`/livros/${id}`, toPayload(data)),
  remove: (id) => http.delete(`/livros/${id}`),
}
