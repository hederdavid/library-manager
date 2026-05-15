import { useQuasar } from 'quasar'

function getErrorMessage(error, fallback = 'Não foi possível concluir a operação.') {
  if (!error) return fallback
  if (typeof error === 'string') return error
  if (error.message) return error.message
  return fallback
}

export function useNotify() {
  const $q = useQuasar()

  function success(message, options = {}) {
    $q.notify({
      type: 'positive',
      icon: 'check',
      position: 'top-right',
      message,
      ...options,
    })
  }

  function info(message, options = {}) {
    $q.notify({
      type: 'info',
      icon: 'info',
      position: 'top-right',
      message,
      ...options,
    })
  }

  function error(errorValue, options = {}) {
    $q.notify({
      type: 'negative',
      icon: 'error',
      position: 'top-right',
      message: getErrorMessage(errorValue, options.fallbackMessage),
      ...options,
    })
  }

  return {
    success,
    info,
    error,
  }
}
