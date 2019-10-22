import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import assign from 'lodash/assign'
import cloneDeep from 'lodash/cloneDeep'
import Results from '../Results/Results'
import { getBookshelf } from '../../store/bookshelf/bookshelfActions'
import { updateBookOnBookshelfService } from '../../services/bookshelfService'
import GenreSelector from './GenreSelector/GenreSelector'

export default function Bookshelf() {
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const selectedGenres = useSelector(state => state.bookshelf.selectedGenres)
  const dispatch = useDispatch()
  const [bookshelfFiltered, setBookshelfFiltered] = React.useState([])
  const [selector, setSelector] = React.useState('OR')
  const [filters, setFilters] = React.useState([])

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
    let filteredBooks = cloneDeep(bookshelf)
    if (selectedGenres.length > 0) {
      filteredBooks = bookshelf.filter(function(book) {
        if (selector === 'AND') {
          return selectedGenres.every(v => book.categories.includes(v))
        }
        return selectedGenres.some(r => book.categories.includes(r))
      })
    }
    filteredBooks = filteredBooks.filter(function(book) {
      return filters.every(v => book[v] === true)
    })

    setBookshelfFiltered(filteredBooks)
  }, [selectedGenres, selector, filters, bookshelf])

  return (
    <>
      <GenreSelector
        setSelector={setSelector}
        selector={selector}
        setFilters={setFilters}
        filters={filters}
      />
      <Results booklist={bookshelfFiltered} handleSave={handleSave} />
    </>
  )
}
