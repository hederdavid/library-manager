import http from './http'

function normalizarTurma(turma) {
  return {
    ...turma,
    idCurso: turma.idCurso ?? turma.curso?.id ?? null,
    idCampus: turma.idCampus ?? turma.campus?.id ?? null,
  }
}

function toDto(data) {
  return {
    anoLetivo: data.anoLetivo,
    serie: data.serie,
    idCurso: data.idCurso,
    idCampus: data.idCampus,
  }
}

export default {
  findAll: async (filters = {}) => {
    const turmas = await http.get('/turma', filters)
    return turmas.map(normalizarTurma)
  },
  findById: async (id) => normalizarTurma(await http.get(`/turma/${id}`)),
  create: async (data) => normalizarTurma(await http.post('/turma', toDto(data))),
  update: async (id, data) => normalizarTurma(await http.patch(`/turma/${id}`, toDto(data))),
  remove: (id) => http.delete(`/turma/${id}`),
}
