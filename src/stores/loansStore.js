import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoansStore = defineStore('loans', () => {
  const tab = ref('new')
  const searchingBook = ref(false)
  const returnCode = ref('')
  const statusFilter = ref('Todos os status')

  const form = ref({
    student: null,
    bookCode: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    condition: 'bom',
  })

  const studentOptions = ref([
    'Rafael Torres Nunes (20240007)',
    'João Pedro Silva (20240001)',
    'Juliana Pereira Gomes (20240008)',
  ])

  const historyColumns = [
    { name: 'student', align: 'left', label: 'ALUNO', field: 'studentName' },
    { name: 'book', align: 'left', label: 'LIVRO', field: 'bookTitle' },
    { name: 'outDate', align: 'left', label: 'SAÍDA', field: 'outDate' },
    { name: 'dueDate', align: 'left', label: 'PREV. DEVOLUÇÃO', field: 'dueDate' },
    { name: 'returnDate', align: 'left', label: 'DEVOLUÇÃO REAL', field: 'returnDate' },
    { name: 'condition', align: 'left', label: 'CONDIÇÃO', field: 'condition' },
    { name: 'status', align: 'left', label: 'STATUS', field: 'status' },
    { name: 'obs', align: 'left', label: 'OBS.', field: 'obs' },
  ]

  const historyRows = ref([
    {
      id: 1,
      studentName: 'Rafael Torres Nunes',
      studentId: '20240007',
      bookTitle: 'Química Orgânica',
      bookCode: 'QUI-001',
      outDate: '05/03/2026',
      dueDate: '05/04/2026',
      returnDate: '20/03/2026',
      condition: 'Novo',
      status: 'Devolvido',
      obs: '-',
    },
    {
      id: 2,
      studentName: 'João Pedro Silva',
      studentId: '20240001',
      bookTitle: 'Programação Orientada a...',
      bookCode: 'INF-013',
      outDate: '01/03/2026',
      dueDate: '01/04/2026',
      returnDate: '-',
      condition: 'Bom',
      status: 'Ativo',
      obs: '-',
    },
    {
      id: 3,
      studentName: 'Juliana Pereira Gomes',
      studentId: '20240008',
      bookTitle: 'Redes de Computadores',
      bookCode: 'INF-008',
      outDate: '20/02/2026',
      dueDate: '20/03/2026',
      returnDate: '22/03/2026',
      condition: 'Novo',
      status: 'Devolvido',
      obs: 'Devolvido com 2 dias d...',
    },
    {
      id: 4,
      studentName: 'Ana Luíza Costa',
      studentId: '20240004',
      bookTitle: 'Fundamentos de Física V...',
      bookCode: 'FIS-001',
      outDate: '15/02/2026',
      dueDate: '15/03/2026',
      returnDate: '-',
      condition: 'Bom',
      status: 'Atrasado',
      obs: '-',
    },
  ])

  function resetForm() {
    form.value = {
      student: null,
      bookCode: '',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      condition: 'bom',
    }
  }

  return {
    tab,
    searchingBook,
    returnCode,
    statusFilter,
    form,
    studentOptions,
    historyColumns,
    historyRows,
    resetForm,
  }
})
