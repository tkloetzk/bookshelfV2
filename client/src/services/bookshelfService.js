import axios from 'axios'
import apiConfig from '../config/apiConfig'

export default function getBookshelfService(includedGenres = []) {
  return axios
    .post(apiConfig.bookshelf, includedGenres)
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}
