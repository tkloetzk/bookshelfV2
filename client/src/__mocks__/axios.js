import apiConfig from '../config/apiConfig'

module.exports = {
  put: jest.fn(url => {
    if (url === `${apiConfig.bookshelf}/update/1a2b`) {
      return Promise.resolve(true)
    }
    return this
  }),
  delete: jest.fn(url => {
    if (url === `${apiConfig.bookshelf}/delete/1a2b`) {
      return Promise.resolve(true)
    }
    return true
  }),
  get: jest.fn(url => {
    if (url === `${apiConfig.goodreads}/9781402218279`) {
      return Promise.resolve({
        data: {
          goodreadsAverageRating: 4.0,
          goodreadsRatingsCount: 40,
          isbn: '9781402218279',
        },
      })
    }
    if (url === `${apiConfig.google}/9781402218279`) {
      return Promise.resolve({
        data: {
          title: 'The New Baby Answer Book',
          isbn: '9781402218279',
          subtitle:
            'From Birth to Kindergarten, Answers to the Top 150 Questions about Raising a Young Child',
          description:
            'Answers the most important parenting questions about raising children from birth through kindergarten, covering such topics as discipline, sleeping, day care, safety, independence, and feeding.',
          thumbnail:
            'http://books.google.com/books/content?id=oD0omQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          categories: ['Family & Relationships'],
        },
      })
    }
    return this
  }),
  post: jest.fn(url => {
    if (url === apiConfig.bookshelf) {
      return Promise.resolve({
        data: [
          {
            categories: ['Toddler', 'Parenting'],
            unread: false,
            owned: true,
            _id: '5c7893eabc9b222a3547548f',
            amazonAverageRating: 4.2,
            amazonRatingsCount: 611,
            price: '',
            isbn: '9780553381436',
            title: 'The Happiest Toddler on the Block',
            subtitle:
              'The New Way to Stop the Daily Battle of Wills and Raise a Secure and Well-Behaved One- to Four-Year-Old',
            description:
              "The pediatrician-author of The Happiest Baby on the Block offers parents a groundbreaking new approach for dealing with toddlers, drawing a parallel between a child's development and humankind's journey to civilization and presenting specific behavioral techniques designed to enhance parent-child communication, alleviate tantrums, and increase positive relationships. Reprint. 60,000 first printing.",
            thumbnail:
              'http://books.google.com/books/content?id=njQpY18IazsC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            goodreadsAverageRating: 3.5,
            goodreadsRatingsCount: 5451,
            __v: 0,
          },
        ],
      })
    }
    if (url === apiConfig.amazonV2) {
      return Promise.resolve({
        data: {
          book: {
            amazonAverageRating: 4.5,
            amazonRatingsCount: 553,
            price: '',
            isbn: '9789079208043',
          },
        },
      })
    }
    return this
  }),
}
