export const checkPropertysEqualToInterface = (obj, example) => {
  const propertysINstate = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      propertysINstate.push(key)
    }
  }
  // console.log(propertysINstate, 'propertysINstate')
  for (const key in example) {
    if (example.hasOwnProperty(key)) {
      if (!(key in obj)) {
        obj[key] = example[key]
      }
    }
  }
  return obj
}
