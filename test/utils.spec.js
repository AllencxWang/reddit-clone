const expect = require('chai').expect
const sort = require('../lib/utils').sort

describe('Utilities', () => {
  describe('testing [sort] function', () => {
    const unsorted = [2, 3, 1]
    it('should return a sorted array (asc)', () => {
      const sorted = sort(unsorted, (a, b) => a-b)
      expect(sorted).to.deep.equal([1, 2, 3])
    })
    it('should return a sorted array (desc)', () => {
      const sorted = sort(unsorted, (a, b) => b-a)
      expect(sorted).to.deep.equal([3, 2, 1])
    })
    it('should return undefine if the input is not an array', () => {
      const sorted = sort('abc', (a, b) => b-a)
      expect(sorted).to.equal(undefined)
    })
  })
})