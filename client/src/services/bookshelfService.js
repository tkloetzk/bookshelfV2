import axios from 'axios'
import apiConfig from '../config/apiConfig'
import map from 'lodash/map'

export function addBookshelfService(booklist) {
  return axios
    .post(`${apiConfig.bookshelf}/add`, booklist)
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}

export function updateBookOnBookshelfService(id, fields) {
  return axios
    .put(`${apiConfig.bookshelf}/update/${id}`, fields)
    .catch(error => {
      throw error
    })
}

export async function updateBooksBookshelfService(books) {
  console.log(books)
  const promiseArray = map(books, book =>
    updateBookOnBookshelfService(book.id, book.fields)
  )

  const response = await Promise.all(promiseArray)

  console.log(response)
  return response
}

export function getBookshelfService(includedGenres = []) {
  return axios
    .post(apiConfig.bookshelf, includedGenres)
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}
