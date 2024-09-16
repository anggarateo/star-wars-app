export function birthYear (value?: string) {
  value?.replace('BBY', 'Before the Battle of Yavin')
  value?.replace('ABY', 'After the Battle of Yavin')

  return value
}
