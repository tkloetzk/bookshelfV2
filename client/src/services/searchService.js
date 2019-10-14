import getGoodreadsBooksService from './goodreadsService'
import getGoogleBookService from './googleService'
import getAmazonBookService from './amazonService'
import merge from 'lodash/merge'

export default async function search(isbns) {
  let promiseArray = []
  for (let isbn of isbns) {
    const book = Promise.all([
      getAmazonBookService(isbn),
      getGoogleBookService(isbn),
      getGoodreadsBooksService(isbn),
    ])
    promiseArray.push(book)
  }

  const booksResponse = await Promise.all(promiseArray)

  let searchedBooklist = booksResponse.map(book =>
    merge({}, book[0], book[1], book[2])
  )

  return searchedBooklist
}
