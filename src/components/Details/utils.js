export const duration = (start = '0:0', end = '0:0') => {
  const [startHours, startMin] = start.split(':')
  let [endHours, endMin] = end.split(':')

  if (endHours < startHours) {
    endHours = +endHours + 24
  }

  const res = (+endHours - +startHours ) * 60 + (+endMin - +startMin)

  return Math.max(0, res)
}
