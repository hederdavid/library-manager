import { ref } from 'vue'
import { useQuasar } from 'quasar'

export function useCrud({ service, emptyForm, validate, messages = {}, loadFn }) {
  const $q = useQuasar()

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
      $q.notify({ type: 'negative', message: e.message, icon: 'error' })
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
        $q.notify({ type: 'positive', message: messages.updated || 'Atualizado com sucesso!', icon: 'check' })
      } else {
        await service.create(form.value)
        $q.notify({ type: 'positive', message: messages.created || 'Criado com sucesso!', icon: 'check' })
      }
      closeDialog()
      await load()
    } catch (e) {
      $q.notify({ type: 'negative', message: e.message, icon: 'error' })
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
      $q.notify({ type: 'positive', message: messages.deleted || 'Excluído com sucesso!', icon: 'check' })
      confirmOpen.value = false
      await load()
    } catch (e) {
      $q.notify({ type: 'negative', message: e.message, icon: 'error' })
    } finally {
      deleting.value = false
      pendingDelete.value = null
    }
  }

  return {
    loading, saving, deleting,
    rows, dialogOpen, editingId, errors, form, confirmOpen, pendingDelete,
    load, openCreate, openEdit, closeDialog, save, confirmDelete, handleDelete,
  }
}
