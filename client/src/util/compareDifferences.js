export default function compareDifferences(oldBook, newBook, difference) {
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
      )
        difference.push({
          key,
          currentValue: oldBook[key],
          newValue: newBook[key],
        })
      // } else {
      //   if (isArray(oldBook[key])) {
      //     if (!isArray(newBook[key]) && !isEmpty(newBook[key])) {
      //       newBook[key] = newBook[key].split(',');
      //     }
      //     if (!arraysEqual(oldBook[key], newBook[key])) {
      //       difference.push({
      //         key,
      //         currentValue: oldBook[key],
      //         newValue: newBook[key],
      //       });
      //     }
      //   }
    }
  }, difference)

  return difference
}
