import http from './http'

function normalizar(estoque) {
  return {
    ...estoque,
    livroId: estoque.livroId ?? estoque.livro?.id ?? null,
    livroTitulo: estoque.livro?.titulo ?? '',
    livroDisciplina: estoque.livro?.disciplina ?? '',
  }
}

function toPayload(data) {
  return {
    livro: data.livroId ? { id: data.livroId } : null,
    qtdTotal: Number(data.qtdTotal) || 0,
    qtdDisponivel: Number(data.qtdDisponivel) || 0,
    qtdNovo: Number(data.qtdNovo) || 0,
    qtdConservado: Number(data.qtdConservado) || 0,
    qtdMalConservado: Number(data.qtdMalConservado) || 0,
    qtdInutilizado: Number(data.qtdInutilizado) || 0,
  }
}

export default {
  async findAll(filters = {}) {
    const list = await http.get('/estoques', filters)
    return list.map(normalizar)
  },

  async findById(id) {
    return normalizar(await http.get(`/estoques/${id}`))
  },

  async create(data) {
    return normalizar(await http.post('/estoques', toPayload(data)))
  },

  async update(id, data) {
    return normalizar(await http.put(`/estoques/${id}`, toPayload(data)))
  },

  remove: (id) => http.delete(`/estoques/${id}`),
}
