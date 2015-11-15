export default function mapValues(obj, mapper) {
  return Object.keys(obj).reduce((nextObj, key) => {
    nextObj[key] = mapper(obj[key], key, obj)
    return nextObj
  }, {})
}
