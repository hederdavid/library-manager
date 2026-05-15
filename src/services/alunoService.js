import http from './http'

function normalizarAluno(aluno) {
  return {
    ...aluno,
    idTurma: aluno.idTurma ?? aluno.turma?.id ?? null,
  }
}

function toPayload(data) {
  return {
    matricula: data.matricula,
    nome: data.nome,
    email: data.email || null,
    fotoPerfil: data.fotoPerfil || null,
    turma: data.idTurma ? { id: data.idTurma } : null,
  }
}

export default {
  async findAll(filters = {}) {
    const alunos = await http.get('/alunos', filters)
    return alunos.map(normalizarAluno)
  },

  async findById(id) {
    return normalizarAluno(await http.get(`/alunos/${id}`))
  },

  async create(data) {
    return normalizarAluno(await http.post('/alunos', toPayload(data)))
  },

  async update(id, data) {
    return normalizarAluno(await http.patch(`/alunos/${id}`, toPayload(data)))
  },

  remove: (id) => http.delete(`/alunos/${id}`),
}
