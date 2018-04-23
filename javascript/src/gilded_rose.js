const UNIT_SELLIN = 1
const MINIMUM_SELLIN = 0
const UNIT_QUALITY = 1
const MINIMUM_QUALITY = 0
const MAXIMUN_QUALITY = 50

function maximumQualityReach (quality) {
  return quality >= MAXIMUN_QUALITY
}

function hasNotSomeQuality (quality) {
  return quality <= MINIMUM_QUALITY
}

class Item {
  constructor (name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }

  isExpired () {
    return this.sellIn < MINIMUM_SELLIN
  }

  decreaseSellin () {
    this.sellIn = this.sellIn - UNIT_SELLIN
  }

  resetQuality () {
    this.quality = MINIMUM_QUALITY
  }

  increaseQuality () {
    if (maximumQualityReach(this.quality)) return
    this.quality = this.quality + UNIT_QUALITY
  }

  decreaseQuality () {
    if (hasNotSomeQuality(this.quality)) return
    this.quality = this.quality - UNIT_QUALITY
  }
}

const TRIPLE_INCREMENT_THRESHOLD = 6
const DOUBLE_INCREMENT_THRESHOLD = 11
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const AGE_BRIE = 'Aged Brie'

function isInTripleIncrement (currentItem) {
  return currentItem.sellIn < TRIPLE_INCREMENT_THRESHOLD
}

function isInDoubleIncrement (currentItem) {
  return currentItem.sellIn < DOUBLE_INCREMENT_THRESHOLD
}

class GildedRose {
  constructor (items) {
    this.items = items
  }

  updateQuality () {
    function updateSellingFor (item) {
      if (isNotSulfuras) {
        item.decreaseSellin()
      }
    }

    function updateQualityFor (item) {
      if (isNotAgeBrie && isNotBackstagePasses && isNotSulfuras) {
        item.decreaseQuality()

        if (item.isExpired()) {
          item.decreaseQuality()
        }
      }

      if (isAgeBrie) {
        item.increaseQuality()

        if (item.isExpired()) {
          item.increaseQuality()
        }
      }

      if (isBackstagePasses) {
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
      }
    }

    for (const currentItem of this.items) {
      var isAgeBrie = currentItem.name === AGE_BRIE
      var isNotAgeBrie = !isAgeBrie
      var isBackstagePasses = currentItem.name === BACKSTAGE_PASSES
      var isNotBackstagePasses = !isBackstagePasses
      var isNotSulfuras = currentItem.name !== SULFURAS

      updateSellingFor(currentItem)
      updateQualityFor(currentItem)
    }
  }
}

module.exports = {
  GildedRose,
  Item
}
