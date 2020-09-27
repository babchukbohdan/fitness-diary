export const duration = (start = '0:0', end = '0:0') => {
  const [startHours, startMin] = start.split(':')
  let [endHours, endMin] = end.split(':')

  if (endHours < startHours) {
    endHours = +endHours + 24
  }

  const res = (+endHours - +startHours ) * 60 + (+endMin - +startMin)

  return Math.max(0, res)
}

export const getPropertyWithString = (obj, path, defaultValue) => {
  // your code here

  const propList = path.split('.')
  let res;
  res = propList.reduce((acc, value) => {

    try {
      if (acc[value] === 'undefined') {
        return undefined
      } else {
        return acc[value]
      }
    } catch (error) {
      return undefined
    }
  }, obj)

  return res || defaultValue
}
