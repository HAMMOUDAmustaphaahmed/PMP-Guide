/**
 * Parse bold text marked with ** ** into React elements
 * @param {string} text - The text containing **bold** markers
 * @returns {Array} Array of React nodes
 */
export function parseBold(text) {
  if (!text) return null
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

/**
 * Debounce function for search inputs
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Truncate a string to a given length
 */
export function truncate(str, len = 60) {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '…' : str
}

/**
 * Get a file extension from a filename
 */
export function getFileExtension(filename) {
  return filename.split('.').pop() || ''
}

/**
 * Check if the app is running on mobile
 */
export function isMobile() {
  return window.innerWidth <= 768
}