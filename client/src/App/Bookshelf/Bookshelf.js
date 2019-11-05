import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import map from 'lodash/map'
import assign from 'lodash/assign'
import Results from '../Results/Results'
import { getBookshelf } from '../../store/bookshelf/bookshelfActions'
import { updateBookOnBookshelfService } from '../../services/bookshelfService'
import GenreSelector from './GenreSelector/GenreSelector'

export default function Bookshelf() {
  const dispatch = useDispatch()
  const [bookshelfFiltered, setBookshelfFiltered] = React.useState([])

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

  return (
    <>
      <GenreSelector setBookshelfFiltered={setBookshelfFiltered} />
      <Results booklist={bookshelfFiltered} handleSave={handleSave} />
    </>
  )
}
