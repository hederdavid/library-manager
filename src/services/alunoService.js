let alunos = [
  {
    id: 1,
    nome: 'Maria Fernanda Santos',
    matricula: '2024001',
    turma: '1A - 2024',
    email: 'maria.santos@ifba.edu.br',
    status: 'Ativo',
  },
  {
    id: 2,
    nome: 'João Pedro Silva',
    matricula: '2024002',
    turma: '2B - 2024',
    email: 'joao.silva@ifba.edu.br',
    status: 'Pendente',
  },
]

let nextId = 3

const wait = () => new Promise((resolve) => setTimeout(resolve, 200))

export default {
  async findAll() {
    await wait()
    return [...alunos]
  },

  async create(data) {
    await wait()
    const aluno = { id: nextId++, ...data }
    alunos = [aluno, ...alunos]
    return aluno
  },

  async update(id, data) {
    await wait()
    alunos = alunos.map((aluno) => (aluno.id === id ? { id, ...data } : aluno))
    return { id, ...data }
  },

  async remove(id) {
    await wait()
    alunos = alunos.filter((aluno) => aluno.id !== id)
  },
}
