export function birthYear (value?: string) {
  value?
    .replace('BBY', 'Before the Battle of Yavin')
    .replace('ABY', 'After the Battle of Yavin')

  return value
}
