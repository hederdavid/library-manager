const BASE_URL = '/api'

function buildQuery(params) {
  if (!params) return ''

  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value)
    }
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

async function request(method, path, body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body !== undefined) options.body = JSON.stringify(body)

  const response = await fetch(`${BASE_URL}${path}`, options)

  if (!response.ok) {
    let message = `Erro ${response.status}: ${response.statusText}`
    let fieldErrors = {}
    if (response.headers.get('content-type')?.includes('application/json')) {
      const json = await response.json().catch(() => null)
      if (json?.message) message = json.message
      if (json?.messages) {
        fieldErrors = json.messages
        message = Object.values(fieldErrors)[0] || message
      }
    }
    const error = new Error(message)
    error.status = response.status
    error.fieldErrors = fieldErrors
    throw error
  }

  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export default {
  get: (path, params) => request('GET', `${path}${buildQuery(params)}`),
  post: (path, data) => request('POST', path, data),
  put: (path, data) => request('PUT', path, data),
  patch: (path, data) => request('PATCH', path, data),
  delete: (path) => request('DELETE', path),
}
