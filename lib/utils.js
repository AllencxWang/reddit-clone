exports.sort = (arr, compare) => {
  if (Array.isArray(arr)) return arr.slice().sort(compare)
}