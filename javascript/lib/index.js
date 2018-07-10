const updateSellingFor = require('./UpdateSellin')
const updateQualityFor = require('./UpdateQuality')
const GildedRose = require('./GildedRose')
const Item = require('./Item')

module.exports = {
  Item,
  GildedRose: GildedRose({updateQualityFor, updateSellingFor})
}
