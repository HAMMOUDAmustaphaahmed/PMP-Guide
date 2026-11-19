const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

async function request(path, { method = 'GET', body, token, signal } = {}) {
  let response
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      signal,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError(0, 'network')
  }

  // Un hébergement statique répond du HTML à /api/... : ce n'est pas notre serveur.
  const isJson = (response.headers.get('content-type') || '').includes('application/json')
  if (response.status === 204) return null
  if (!isJson) throw new ApiError(0, 'network')

  const data = await response.json()
  if (!response.ok) {
    const detail = typeof data?.detail === 'string' ? data.detail : ''
    throw new ApiError(response.status, detail)
  }
  return data
}

export const api = {
  health: (signal) => request('/health', { signal }),
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password } }),
  me: (token) => request('/auth/me', { token }),
  getContent: (lang, signal) => request(`/content/${lang}`, { signal }),
  putContent: (lang, content, token) => request(`/content/${lang}`, { method: 'PUT', body: content, token }),
  deleteContent: (lang, token) => request(`/content/${lang}`, { method: 'DELETE', token }),
}
