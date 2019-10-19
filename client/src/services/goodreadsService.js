import axios from 'axios'
import apiConfig from '../config/apiConfig'

export default function getGoodreadsBooksService(isbn) {
  return axios
    .get(`${apiConfig.goodreads}/${isbn}`)
    .then(booklist => booklist.data)
    .catch(error => {
      return {
        goodreadsError: isbn,
        error,
      }
    })
}
