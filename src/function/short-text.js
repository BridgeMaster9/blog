export const shortText = (text, type) => {
  if (!text) return text
  if (type === 'description') {
    if (text.length > 150) return `${text.slice(0, 200)}...`
    if (!/\S/.test(text)) {
      return 'no description'
    }
    return text
  }
  if (type === 'title') {
    if (text.length > 60) return `${text.slice(0, 59)}...`
    if (!/\S/.test(text)) {
      return 'no title'
    }
    return text
  }
}
