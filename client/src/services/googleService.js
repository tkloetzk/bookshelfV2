import axios from 'axios'
import apiConfig from '../config/apiConfig'

export default function getGoogleBookService(isbn) {
  return axios
    .get(`${apiConfig.google}/${isbn}`)
    .then(book => book.data)
    .catch(error => {
      throw error
    })
}
