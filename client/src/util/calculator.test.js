import sortBooklist from './calculator'

describe('calculator', () => {
  it('sortBooklist', () => {
    const booklist = [
      {
        amazonAverageRating: 4.1,
        amazonRatingsCount: 608,
        title: 'The Happiest Toddler on the Block',
        goodreadsAverageRating: 3.5,
        goodreadsRatingsCount: 5396,
      },
      {
        amazonAverageRating: 3.6,
        amazonRatingsCount: 75,
        title: 'Montessori',
        goodreadsAverageRating: 4.21,
        goodreadsRatingsCount: 711,
      },
      {
        amazonAverageRating: 4.4,
        amazonRatingsCount: 373,
        title: 'Sh*tty Mom',
        goodreadsAverageRating: 3.75,
        goodreadsRatingsCount: 2115,
      },
      {
        amazonAverageRating: 4.8,
        amazonRatingsCount: 60,
        title: 'How to be a Happier Parent',
        goodreadsAverageRating: 4.03,
        goodreadsRatingsCount: 418,
      },
      {
        amazonAverageRating: 2.4,
        amazonRatingsCount: 2424,
        title: 'The Happiest Baby on the Block',
        goodreadsAverageRating: 3.92,
        goodreadsRatingsCount: 19277,
      },
      {
        amazonAverageRating: 2.4,
        amazonRatingsCount: 2424,
        title: 'The Happiest Baby on the Block',
        goodreadsAverageRating: 3.92,
        goodreadsRatingsCount: 19277,
      },
    ]
    const sorted = sortBooklist(booklist)
    expect(sorted[0].adjustedRating).toEqual(3.844713188507616)
    expect(sorted[0].adjustedRating).toBeGreaterThan(sorted[1].adjustedRating)
    expect(sorted[1].adjustedRating).toEqual(3.789755517266208)
    expect(sorted[1].adjustedRating).toBeGreaterThan(sorted[2].adjustedRating)
    expect(sorted[2].adjustedRating).toEqual(3.765248318510167)
    expect(sorted[2].adjustedRating).toBeGreaterThan(sorted[3].adjustedRating)
    expect(sorted[3].adjustedRating).toEqual(3.7652147890364303)
    expect(sorted[3].adjustedRating).toBeGreaterThan(sorted[4].adjustedRating)
    expect(sorted[4].adjustedRating).toEqual(3.3323231114361427)
    expect(sorted[4].adjustedRating).toEqual(sorted[5].adjustedRating)
    expect(sorted[5].adjustedRating).toEqual(3.3323231114361427)
  })
})
