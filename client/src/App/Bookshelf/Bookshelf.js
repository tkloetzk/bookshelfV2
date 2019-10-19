import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import assign from 'lodash/assign'
import Results from '../Results/Results'
import { getBookshelf } from '../../store/bookshelf/bookshelfActions'
import { updateBookOnBookshelfService } from '../../services/bookshelfService'

export default function Bookshelf() {
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const dispatch = useDispatch()

  async function handleSave(book, edits) {
    const fields = map(edits, diff => {
      return { [diff.key]: diff.newValue }
    })

    await updateBookOnBookshelfService(book._id, assign(...fields), false)
    dispatch(getBookshelf())
  }

  useEffect(() => {
    dispatch(getBookshelf())
  }, [dispatch])

  return <Results booklist={bookshelf} handleSave={handleSave} />
}
