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

export const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const getRandomHslColor = (s = 100, l = 63) => {
  // console.log(`hsl( ${random(0, 360)}, ${s}%, ${l}% )`, 'color')
  return `hsl( ${random(0, 360)}, ${s}%, ${l}% )`
}

export const fromCamelCaseToLowerSpaceCase = (str) => {
  const result = str.replace( /([A-Z])/g, " $1" );
  return result.split(' ').map(word => word.toLowerCase()).join(' ')
}

function checkObjPropertiesEqualToInterface(obj, example) {
  const objKeys = Object.keys(obj)
  const exampleKeys = Object.keys(example)

  return exampleKeys.every(value => {
    return objKeys.includes(value)
  })
}
