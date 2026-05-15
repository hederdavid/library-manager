import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { mockConfig } from 'src/services/mockConfig'

export const useLoansStore = defineStore('loans', () => {
  const tab = ref('new')
  const searchingBook = ref(false)
  const returnCode = ref('')
  const statusFilter = ref('Todos os status')
  const historySearch = ref('')

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
    { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
    { name: 'student', align: 'left', label: 'ALUNO', field: 'studentName' },
    { name: 'book', align: 'left', label: 'LIVRO', field: 'bookTitle' },
    { name: 'bookCode', align: 'left', label: 'CÓDIGO', field: 'bookCode' },
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
      bookTitle: 'Programação Orientada a Objetos',
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
      obs: 'Devolvido com 2 dias de atraso',
    },
    {
      id: 4,
      studentName: 'Ana Luíza Costa',
      studentId: '20240004',
      bookTitle: 'Fundamentos de Física Volume 1',
      bookCode: 'FIS-001',
      outDate: '15/02/2026',
      dueDate: '15/03/2026',
      returnDate: '-',
      condition: 'Bom',
      status: 'Atrasado',
      obs: '-',
    },
  ])

  const usandoMockEmprestimos = computed(() => mockConfig.usarMockEmprestimos)

  const filteredHistoryRows = computed(() => {
    const search = historySearch.value.trim().toLowerCase()
    const status = statusFilter.value

    return historyRows.value.filter((row) => {
      const matchesStatus = status === 'Todos os status' || row.status === status
      const matchesSearch =
        !search ||
        row.studentName.toLowerCase().includes(search) ||
        row.studentId.toLowerCase().includes(search) ||
        row.bookTitle.toLowerCase().includes(search) ||
        row.bookCode.toLowerCase().includes(search)

      return matchesStatus && matchesSearch
    })
  })

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
    historySearch,
    form,
    studentOptions,
    historyColumns,
    historyRows,
    filteredHistoryRows,
    usandoMockEmprestimos,
    resetForm,
  }
})
