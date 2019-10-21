import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import assign from 'lodash/assign'
import Results from '../Results/Results'
import { getBookshelf } from '../../store/bookshelf/bookshelfActions'
import { updateBookOnBookshelfService } from '../../services/bookshelfService'
import GenreSelector from './GenreSelector/GenreSelector'
import intersection from 'lodash/intersection'

export default function Bookshelf() {
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const selectedGenres = useSelector(state => state.bookshelf.selectedGenres)
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

  if (selectedGenres.length > 0) {
    var filteredEvents = bookshelf.filter(function(book) {
      //  if (orSelector) {
      if (selectedGenres.every(v => book.categories.includes(v))) {
        console.log(book)
      }
      //  return selectedGenres.some(r=> book.categories.includes(r))
      // }
    })
    // console.log(filteredEvents)
  }
  return (
    <>
      <GenreSelector />
      <Results booklist={bookshelf} handleSave={handleSave} />
    </>
  )
}
