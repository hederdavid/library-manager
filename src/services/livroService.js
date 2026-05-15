import { mockConfig } from './mockConfig'

let livros = [
  {
    id: 1,
    titulo: 'Algoritmos: Teoria e Prática',
    codigo: 'INF-001',
    autor: 'Thomas H. Cormen',
    categoria: 'Informática',
    condicao: 'Bom',
    status: 'Disponível',
  },
  {
    id: 2,
    titulo: 'Programação Orientada a Objetos',
    codigo: 'INF-013',
    autor: 'Robert C. Martin',
    categoria: 'Informática',
    condicao: 'Novo',
    status: 'Emprestado',
  },
]

let nextId = 3

const wait = () => new Promise((resolve) => setTimeout(resolve, 200))

export default {
  async findAll() {
    if (!mockConfig.usarMockLivros) {
      throw new Error('API de livros ainda não foi conectada no front.')
    }
    await wait()
    return [...livros]
  },

  async create(data) {
    if (!mockConfig.usarMockLivros) {
      throw new Error('API de livros ainda não foi conectada no front.')
    }
    await wait()
    const livro = { id: nextId++, ...data }
    livros = [livro, ...livros]
    return livro
  },

  async update(id, data) {
    if (!mockConfig.usarMockLivros) {
      throw new Error('API de livros ainda não foi conectada no front.')
    }
    await wait()
    livros = livros.map((livro) => (livro.id === id ? { id, ...data } : livro))
    return { id, ...data }
  },

  async remove(id) {
    if (!mockConfig.usarMockLivros) {
      throw new Error('API de livros ainda não foi conectada no front.')
    }
    await wait()
    livros = livros.filter((livro) => livro.id !== id)
  },
}
