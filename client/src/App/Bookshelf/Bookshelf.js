import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Results from '../Results/Results'
import { getBookshelf } from '../../store/bookshelf/bookshelfActions'

export default function Bookshelf() {
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookshelf())
  }, [dispatch])

  return <Results booklist={bookshelf} />
}
