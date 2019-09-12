import apiConfig from '../../../config/apiConfig';
import axios from 'axios';

export function getGoogleBookService(isbn) {
  return axios
    .get(`${apiConfig.google}/${isbn}`)
    .then(book => book)
    .catch(error => {
      throw error;
    });
}