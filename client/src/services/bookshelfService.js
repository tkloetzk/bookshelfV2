import axios from 'axios'
import apiConfig from '../config/apiConfig'

export function addBookshelfService(booklist) {
  return axios
    .post(`${apiConfig.bookshelf}/add`, booklist)
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}

export function getBookshelfService(includedGenres = []) {
  return axios
    .post(apiConfig.bookshelf, includedGenres)
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}
