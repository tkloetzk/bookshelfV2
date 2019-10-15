import axios from 'axios'
import apiConfig from '../config/apiConfig'

export default function getAmazonBookService(isbn) {
  return axios
    .post(apiConfig.amazonV2, { isbn })
    .then(res => res.data.book)
    .catch(error => {
      return {
        amazonError: isbn,
        error,
      }
    })
}
