import http from './http'

function normalizar(emprestimo) {
  return {
    ...emprestimo,
    alunoNome: emprestimo.aluno?.nome ?? '',
    alunoMatricula: emprestimo.aluno?.matricula ?? '',
    livroTitulo: emprestimo.livro?.titulo ?? '',
    livroDisciplina: emprestimo.livro?.disciplina ?? '',
  }
}

export default {
  async findAll(filters = {}) {
    const list = await http.get('/emprestimos', filters)
    return list.map(normalizar)
  },

  async findById(id) {
    return normalizar(await http.get(`/emprestimos/${id}`))
  },

  create: (data) =>
    http.post('/emprestimos', {
      aluno: { id: data.alunoId },
      livro: { id: data.livroId },
      condicaoEntrega: data.condicaoEntrega,
    }),

  devolver: (id, condicaoDevolucao) =>
    http.put(`/emprestimos/${id}/devolver?condicaoDevolucao=${condicaoDevolucao}`),

  remove: (id) => http.delete(`/emprestimos/${id}`),
}
