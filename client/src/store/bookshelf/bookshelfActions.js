import FETCH_BOOKSHELF_SUCCESS from './bookshelfActionTypes'
import getBookshelfService from '../../services/bookshelfService'

export function getBookshelfSuccess(bookshelf) {
  return {
    type: FETCH_BOOKSHELF_SUCCESS,
    bookshelf,
  }
}

export function getBookshelf() {
  return dispatch => {
    // dispatch(getBookshelfIsLoading(true));

    // If false, means no genres are selected so return nothing
    return getBookshelfService()
      .then(bookshelf => {
        //  dispatch(getBookshelfIsLoading(false));
        dispatch(getBookshelfSuccess(bookshelf))
        //     dispatch(getBookshelfGenres());
        //     dispatch(getBookshelfFailure(false, null));
        return bookshelf
      })
      .catch(error => {
        //     dispatch(getBookshelfIsLoading(false));
        //      dispatch(getBookshelfFailure(true, error));
        console.error('bookshelf error', error)
      })
  }
}
