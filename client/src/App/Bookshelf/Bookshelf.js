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
  const [bookshelfFiltered, setBookshelfFiltered] = React.useState([])
  const [selector, setSelector] = React.useState('OR')

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

  useEffect(() => {
    setBookshelfFiltered(bookshelf)
  }, [bookshelf])

  useEffect(() => {
    if (selectedGenres.length > 0) {
      const filteredBooks = bookshelf.filter(function(book) {
        if (selector === 'AND') {
          return selectedGenres.every(v => book.categories.includes(v))
        }
        return selectedGenres.some(r => book.categories.includes(r))
      })
      setBookshelfFiltered(filteredBooks)
    } else {
      setBookshelfFiltered(bookshelf)
    }
  }, [selectedGenres, selector])

  return (
    <>
      <GenreSelector setSelector={setSelector} selector={selector} />
      <Results booklist={bookshelfFiltered} handleSave={handleSave} />
    </>
  )
}
