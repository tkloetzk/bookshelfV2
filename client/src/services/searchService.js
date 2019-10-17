import merge from 'lodash/merge'
import forEach from 'lodash/forEach'
import getGoodreadsBooksService from './goodreadsService'
import getGoogleBookService from './googleService'
import getAmazonBookService from './amazonService'

export default async function search(isbns) {
  const promiseArray = []
  forEach(isbns, isbn => {
    const book = Promise.all([
      getAmazonBookService(isbn),
      getGoogleBookService(isbn),
      getGoodreadsBooksService(isbn),
    ])
    promiseArray.push(book)
  })

  const booksResponse = await Promise.all(promiseArray)

  console.log('booksResponse', booksResponse)
  const searchedBooklist = booksResponse.map(book =>
    merge({}, book[0], book[1], book[2])
  )

  return searchedBooklist
}
