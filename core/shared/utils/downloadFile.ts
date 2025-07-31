export const downloadFile = async (doc: { title: string; url: string }) => {
  const response = await fetch(doc.url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = doc.title
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Nettoyer l'URL blob
  window.URL.revokeObjectURL(url)
}
