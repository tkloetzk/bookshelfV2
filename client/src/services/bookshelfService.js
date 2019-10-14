import apiConfig from '../config/apiConfig'
import axios from 'axios'

export default function getBookshelfService(includedGenres = []) {
  return axios
    .post(apiConfig.bookshelf, includedGenres)
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}
