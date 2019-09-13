import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from '../Results/Results'
import apiConfig from '../../config/apiConfig'

export default function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(apiConfig.bookshelf, [])
      setBookshelf(response.data)
    }
    fetchData()
  }, [])

  return <Results booklist={bookshelf} />
}
