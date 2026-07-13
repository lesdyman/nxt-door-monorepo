const dateFormatter = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffMinutes = Math.floor(diffMs / 60000)

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`
  }

  return new Date(date)
    .toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', ' at')
}

export default dateFormatter
