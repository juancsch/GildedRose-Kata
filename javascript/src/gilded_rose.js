const updateSellingFor = require('./update_sellin')
const updateQualityFor = require('./update_quality')

class GildedRose {
  constructor (items) {
    this.items = items
  }

  updateQuality () {
    this.items.forEach(currentItem => {
      updateSellingFor(currentItem)
      updateQualityFor(currentItem)
    })
  }
}

module.exports = GildedRose
