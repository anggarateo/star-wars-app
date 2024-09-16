function birthYear (value?: string) {
  let result = value
  result = value.replace('BBY', 'Before the Battle of Yavin')
  result = value.replace('ABY', 'After the Battle of Yavin')

  return result
}

export default birthYear
