import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from '../Results/Results'
import apiConfig from '../../config/apiConfig'
import { useDispatch, useSelector } from 'react-redux'
import { getBookshelf } from '../../store/bookshelf/bookshelfActions'

export default function Bookshelf() {
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookshelf())
  }, [])

  return <Results booklist={bookshelf} />
}
