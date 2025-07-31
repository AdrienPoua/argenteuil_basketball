export const getSaison = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  if (month >= 5) {
    return `${year}-${year + 1}`
  }
  return `${year - 1}-${year}`
}
