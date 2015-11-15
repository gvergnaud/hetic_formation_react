export default function pick(obj, predicate) {
  return Object.keys(obj).reduce((nextObj, key) => {
    if (predicate(obj[key], key, obj)) nextObj[key] = obj[key]
    return nextObj
  }, {})
}
