import compareDifferences from './compareDifferences'

describe('compareDifferences', () => {
  it('new book', () => {
    const oldBook = {
      amazonAverageRating: 4.8,
      amazonRatingsCount: 6745,
      price: '',
      isbn: '9780920668375',
      title: 'Love You Forever',
      subtitle: '',
      description:
        'As her son grows up from little boy to adult man, a mother secretly rocks him each night as he sleeps.',
      thumbnail:
        'http://books.google.com/books/content?id=7ep09WAFbDwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      categories: ['Juvenile Fiction'],
      goodreadsAverageRating: 4.35,
      goodreadsRatingsCount: 181555,
      adjustedRating: 4.574999999999999,
    }
    const newBook = {
      amazonAverageRating: 4.7,
      amazonRatingsCount: 6735,
      price: '$4.50',
      isbn: '9780920668375',
      title: 'Love You Forever1',
      subtitle: '',
      description:
        'As her son grows up from little boy to adult man, a mother secretly rocks him each night as he sleeps.',
      thumbnail:
        'http://books.google.com/books/content?id=7ep09WAFbDwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      categories: "Children's Book",
      goodreadsAverageRating: 4.25,
      goodreadsRatingsCount: 181535,
      adjustedRating: 4,
    }
    const edits = [
      {
        key: 'amazonAverageRating',
        currentValue: 4.8,
        newValue: 4.7,
      },
      {
        key: 'amazonRatingsCount',
        currentValue: 6745,
        newValue: 6735,
      },
      {
        key: 'price',
        currentValue: '',
        newValue: '$4.50',
      },
      {
        key: 'title',
        currentValue: 'Love You Forever',
        newValue: 'Love You Forever1',
      },
      //   {
      //     key: 'categories',
      //     currentValue: ['Juvenile Fiction'],
      //     newValue: ["Children's Book"],
      //   },
      {
        key: 'goodreadsAverageRating',
        currentValue: 4.35,
        newValue: 4.25,
      },
      {
        key: 'goodreadsRatingsCount',
        currentValue: 181555,
        newValue: 181535,
      },
    ]
    const response = compareDifferences(oldBook, newBook, [])
    expect(JSON.stringify(response)).toEqual(JSON.stringify(edits))
  })
  describe('compareCategories', () => {
    it('with compareCategories', () => {
      const oldBook = {
        categories: ['Juvenile Fiction'],
      }
      const newBook = {
        categories: "Children's Book",
      }
      const edits = [
        {
          key: 'categories',
          currentValue: oldBook.categories,
          newValue: [newBook.categories],
        },
      ]
      const response = compareDifferences(oldBook, newBook, [], true)
      expect(JSON.stringify(response)).toEqual(JSON.stringify(edits))
    })
    it('categories are the same', () => {
      const oldBook = {
        categories: ['Juvenile Fiction'],
      }
      const newBook = {
        categories: 'Juvenile Fiction',
      }

      const response = compareDifferences(oldBook, newBook, [], true)
      expect(response).toEqual([])
    })
    it('categories are different lengths', () => {
      const oldBook = {
        categories: ['Juvenile Fiction', 'Test Category'],
      }
      const newBook = {
        categories: "Children's Book",
      }
      const edits = [
        {
          key: 'categories',
          currentValue: oldBook.categories,
          newValue: [newBook.categories],
        },
      ]
      const response = compareDifferences(oldBook, newBook, [], true)
      expect(JSON.stringify(response)).toEqual(JSON.stringify(edits))
    })
  })
})
