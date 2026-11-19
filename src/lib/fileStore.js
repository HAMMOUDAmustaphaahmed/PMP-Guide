// Les PDF ajoutés par le visiteur restent dans SON navigateur (IndexedDB).
// localStorage est limité à ~5 Mo : un seul livre suffisait à le saturer.

const DB_NAME = 'pmp-library'
const STORE = 'files'

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function run(mode, action) {
  const db = await open()
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode)
      const req = action(tx.objectStore(STORE))
      tx.oncomplete = () => resolve(req?.result)
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
  } finally {
    db.close()
  }
}

export const fileStore = {
  put: (id, blob) => run('readwrite', (s) => s.put(blob, id)),
  get: (id) => run('readonly', (s) => s.get(id)),
  remove: (id) => run('readwrite', (s) => s.delete(id)),
  clear: () => run('readwrite', (s) => s.clear()),
}
