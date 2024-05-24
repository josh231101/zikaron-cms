export const filterObjectProperties = (object = {}, allowedKeys = []) => {
  const filtered = Object.keys(object)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})
  return filtered
}

export const filterObjectPropertiesOnArray = (arrWithObjs = [], allowedKeys = []) => {
  return arrWithObjs.map((item) => filterObjectProperties(item, allowedKeys))
}
