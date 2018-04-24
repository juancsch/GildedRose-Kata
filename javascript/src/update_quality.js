const {BACKSTAGE_PASSES, AGE_BRIE, SULFURAS} = require('./products_names')

module.exports = function updateQualityFor (item) {
  const updater = {
    DEFAULT (item) {
      item.decreaseQuality()
      if (item.isExpired()) {
        item.decreaseQuality()
      }
    },
    [BACKSTAGE_PASSES] (item) {
      const TRIPLE_INCREMENT_THRESHOLD = 6
      const DOUBLE_INCREMENT_THRESHOLD = 11

      function isInTripleIncrement (currentItem) {
        return currentItem.sellIn < TRIPLE_INCREMENT_THRESHOLD
      }

      function isInDoubleIncrement (currentItem) {
        return currentItem.sellIn < DOUBLE_INCREMENT_THRESHOLD
      }

      item.increaseQuality()

      if (isInDoubleIncrement(item)) {
        item.increaseQuality()
      }

      if (isInTripleIncrement(item)) {
        item.increaseQuality()
      }

      if (item.isExpired()) {
        item.resetQuality()
      }
    },
    [AGE_BRIE] (item) {
      item.increaseQuality()
      if (item.isExpired()) {
        item.increaseQuality()
      }
    },
    [SULFURAS] (item) {}
  }
  updater[item.name] ? updater[item.name](item) : updater['DEFAULT'](item)
}
