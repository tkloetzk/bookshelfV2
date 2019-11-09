import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

function arraysEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length != b.length) return false

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export default function compareDifferences(
  oldBook,
  newBook,
  difference,
  compareCategories = false
) {
  Object.keys(oldBook).forEach(key => {
    if (typeof oldBook[key] !== 'object') {
      if (
        oldBook[key] !== newBook[key] &&
        key !== '__v' &&
        key !== '_id' &&
        key !== 'adjustedRating' &&
        key !== 'thumbnail' &&
        key !== 'categories' &&
        key !== 'owned' &&
        key !== 'read' &&
        newBook[key] !== '' &&
        newBook[key] !== 0
      ) {
        difference.push({
          key,
          currentValue: oldBook[key],
          newValue: newBook[key],
        })
      }
    } else {
      if (isArray(oldBook[key]) && key === 'categories' && compareCategories) {
        if (!isArray(newBook[key]) && !isEmpty(newBook[key])) {
          newBook[key] = newBook[key].split(',')
        }
        if (!arraysEqual(oldBook[key], newBook[key])) {
          difference.push({
            key,
            currentValue: oldBook[key],
            newValue: newBook[key],
          })
        }
      }
    }
  }, difference)

  return difference
}
