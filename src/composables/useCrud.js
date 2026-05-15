import { ref } from 'vue'
import { useNotify } from 'src/composables/useNotify'

export function useCrud({ service, emptyForm, validate, messages = {}, loadFn }) {
  const notify = useNotify()

  const loading = ref(false)
  const saving = ref(false)
  const deleting = ref(false)
  const rows = ref([])
  const dialogOpen = ref(false)
  const editingId = ref(null)
  const errors = ref({})
  const form = ref(emptyForm())
  const confirmOpen = ref(false)
  const pendingDelete = ref(null)

  async function load() {
    loading.value = true
    try {
      rows.value = await (loadFn ? loadFn() : service.findAll())
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao carregar registros.' })
    } finally {
      loading.value = false
    }
  }

  function openCreate() {
    form.value = emptyForm()
    errors.value = {}
    editingId.value = null
    dialogOpen.value = true
  }

  function openEdit(row) {
    const { id, ...rest } = row
    form.value = rest
    errors.value = {}
    editingId.value = id
    dialogOpen.value = true
  }

  function closeDialog() {
    dialogOpen.value = false
  }

  async function save() {
    const validationErrors = validate(form.value)
    if (Object.keys(validationErrors).length) {
      errors.value = validationErrors
      return
    }
    errors.value = {}
    saving.value = true
    try {
      if (editingId.value) {
        await service.update(editingId.value, form.value)
        notify.success(messages.updated || 'Atualizado com sucesso!')
      } else {
        await service.create(form.value)
        notify.success(messages.created || 'Criado com sucesso!')
      }
      closeDialog()
      await load()
    } catch (e) {
      if (e.fieldErrors && Object.keys(e.fieldErrors).length) {
        errors.value = e.fieldErrors
      }
      notify.error(e, { fallbackMessage: 'Erro ao salvar registro.' })
    } finally {
      saving.value = false
    }
  }

  function confirmDelete(row) {
    pendingDelete.value = row
    confirmOpen.value = true
  }

  async function handleDelete() {
    deleting.value = true
    try {
      await service.remove(pendingDelete.value.id)
      notify.success(messages.deleted || 'Excluído com sucesso!')
      confirmOpen.value = false
      await load()
    } catch (e) {
      notify.error(e, { fallbackMessage: 'Erro ao excluir registro.' })
    } finally {
      deleting.value = false
      pendingDelete.value = null
    }
  }

  return {
    loading,
    saving,
    deleting,
    rows,
    dialogOpen,
    editingId,
    errors,
    form,
    confirmOpen,
    pendingDelete,
    load,
    openCreate,
    openEdit,
    closeDialog,
    save,
    confirmDelete,
    handleDelete,
  }
}
