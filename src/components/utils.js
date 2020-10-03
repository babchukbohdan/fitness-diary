export const transformObjEqualToInterface = (obj, example) => {

  checkObjPropertiesEqualToInterface(obj, example)
  for (const key in example) {
    if (example.hasOwnProperty(key)) {
      if (!(key in obj)) {
        typeof example[key] === 'object'
          ? obj[key] = {...example[key]}
          : obj[key] = example[key]
      } else {
        if (typeof example[key] === 'object') {
          if (!checkObjPropertiesEqualToInterface(obj[key], example[key])) {
            obj[key] = {...example[key], ...obj[key]}
          }
        }
      }
    }
  }
  return obj
}


function checkObjPropertiesEqualToInterface(obj, example) {
  const objKeys = Object.keys(obj)
  const exampleKeys = Object.keys(example)

  return exampleKeys.every(value => {
    return objKeys.includes(value)
  })
}
