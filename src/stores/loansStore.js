import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import emprestimoService from 'src/services/emprestimoService'
import alunoService from 'src/services/alunoService'
import livroService from 'src/services/livroService'
import { useNotify } from 'src/composables/useNotify'

export const useLoansStore = defineStore('loans', () => {
  const notify = useNotify()

  const tab = ref('new')
  const loading = ref(false)
  const submitting = ref(false)

  // ── Dados carregados da API ──
  const emprestimos = ref([])
  const alunos = ref([])
  const livros = ref([])

  // ── Filtros do histórico ──
  const statusFilter = ref(null)
  const historySearch = ref('')

  // ── Formulário de novo empréstimo ──
  const form = ref({
    alunoId: null,
    livroId: null,
    condicaoEntrega: 'NOVO',
  })

  // ── Devolução ──
  const devolvendo = ref(false)
  const devolucaoDialog = ref(false)
  const emprestimoParaDevolver = ref(null)
  const condicaoDevolucao = ref('NOVO')

  // ── Options para q-select ──
  const alunoOptions = computed(() =>
    alunos.value.map((a) => ({
      label: `${a.nome} (${a.matricula})`,
      value: a.id,
    })),
  )

  const livroOptions = computed(() =>
    livros.value.map((l) => ({
      label: `${l.titulo} — ${l.disciplina}`,
      value: l.id,
    })),
  )

  // ── Stats para cards ──
  const statsAtivos = computed(
    () => emprestimos.value.filter((e) => e.statusEmprestimo === 'EMPRESTADO').length,
  )
  const statsAtrasados = computed(
    () => emprestimos.value.filter((e) => e.statusEmprestimo === 'ATRASADO').length,
  )
  const statsDevolvidos = computed(
    () => emprestimos.value.filter((e) => e.statusEmprestimo === 'DEVOLVIDO').length,
  )

  // ── Empréstimos pendentes (para aba Devolução) ──
  const emprestimosPendentes = computed(() =>
    emprestimos.value.filter(
      (e) => e.statusEmprestimo === 'EMPRESTADO' || e.statusEmprestimo === 'ATRASADO',
    ),
  )

  // ── Histórico filtrado ──
  const historyColumns = [
    { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
    { name: 'student', align: 'left', label: 'ALUNO', field: 'alunoNome' },
    { name: 'book', align: 'left', label: 'LIVRO', field: 'livroTitulo' },
    { name: 'outDate', align: 'left', label: 'SAÍDA', field: 'dataEntrega' },
    { name: 'returnDate', align: 'left', label: 'DEVOLUÇÃO', field: 'dataDevolucao' },
    {
      name: 'condEntrega',
      align: 'left',
      label: 'COND. ENTREGA',
      field: 'condicaoEntrega',
    },
    {
      name: 'condDevolucao',
      align: 'left',
      label: 'COND. DEVOLUÇÃO',
      field: 'condicaoDevolucao',
    },
    { name: 'status', align: 'left', label: 'STATUS', field: 'statusEmprestimo' },
  ]

  const filteredHistoryRows = computed(() => {
    const search = historySearch.value.trim().toLowerCase()
    const status = statusFilter.value

    return emprestimos.value.filter((row) => {
      const matchesStatus = !status || row.statusEmprestimo === status
      const matchesSearch =
        !search ||
        row.alunoNome.toLowerCase().includes(search) ||
        row.alunoMatricula.toLowerCase().includes(search) ||
        row.livroTitulo.toLowerCase().includes(search)

      return matchesStatus && matchesSearch
    })
  })

  // ── Actions ──
  async function carregarEmprestimos() {
    loading.value = true
    try {
      emprestimos.value = await emprestimoService.findAll()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao carregar empréstimos.' })
    } finally {
      loading.value = false
    }
  }

  async function carregarAlunos() {
    try {
      alunos.value = await alunoService.findAll()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao carregar alunos.' })
    }
  }

  async function carregarLivros() {
    try {
      livros.value = await livroService.findAll()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao carregar livros.' })
    }
  }

  async function carregarDados() {
    await Promise.all([carregarEmprestimos(), carregarAlunos(), carregarLivros()])
  }

  async function criarEmprestimo() {
    submitting.value = true
    try {
      await emprestimoService.create(form.value)
      notify.success('Empréstimo registrado com sucesso!')
      resetForm()
      await carregarEmprestimos()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao registrar empréstimo.' })
    } finally {
      submitting.value = false
    }
  }

  function abrirDevolucao(emprestimo) {
    emprestimoParaDevolver.value = emprestimo
    condicaoDevolucao.value = 'NOVO'
    devolucaoDialog.value = true
  }

  async function confirmarDevolucao() {
    if (!emprestimoParaDevolver.value) return
    devolvendo.value = true
    try {
      await emprestimoService.devolver(emprestimoParaDevolver.value.id, condicaoDevolucao.value)
      notify.success('Devolução registrada com sucesso!')
      devolucaoDialog.value = false
      emprestimoParaDevolver.value = null
      await carregarEmprestimos()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao registrar devolução.' })
    } finally {
      devolvendo.value = false
    }
  }

  async function excluirEmprestimo(id) {
    try {
      await emprestimoService.remove(id)
      notify.success('Empréstimo excluído com sucesso!')
      await carregarEmprestimos()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao excluir empréstimo.' })
    }
  }

  function resetForm() {
    form.value = {
      alunoId: null,
      livroId: null,
      condicaoEntrega: 'NOVO',
    }
  }

  return {
    // State
    tab,
    loading,
    submitting,
    emprestimos,
    alunos,
    livros,
    statusFilter,
    historySearch,
    form,
    devolvendo,
    devolucaoDialog,
    emprestimoParaDevolver,
    condicaoDevolucao,

    // Computed
    alunoOptions,
    livroOptions,
    statsAtivos,
    statsAtrasados,
    statsDevolvidos,
    emprestimosPendentes,
    historyColumns,
    filteredHistoryRows,

    // Actions
    carregarDados,
    carregarEmprestimos,
    criarEmprestimo,
    abrirDevolucao,
    confirmarDevolucao,
    excluirEmprestimo,
    resetForm,
  }
})
