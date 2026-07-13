const nameReducer = (name: string) => {
  const parts = name.split(' ')
  if (parts.length === 1) {
    return parts[0]
  }
  return `${parts[0]} ${parts[1][0]}.`
}

export default nameReducer
