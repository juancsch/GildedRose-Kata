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
    for (const currentItem of this.items) {
      const isAgeBrie = currentItem.name === AGE_BRIE
      const isNotAgeBrie = !isAgeBrie
      const isBackstagePasses = currentItem.name === BACKSTAGE_PASSES
      const isNotBackstagePasses = !isBackstagePasses
      const isNotSulfuras = currentItem.name !== SULFURAS

	  if (isNotSulfuras) {
	    currentItem.decreaseSellin()
	  }

      if (isNotAgeBrie && isNotBackstagePasses && isNotSulfuras) {
        currentItem.decreaseQuality()

		if (currentItem.isExpired()) {
		  currentItem.decreaseQuality()
		}
      }

      if (isAgeBrie) {
        currentItem.increaseQuality()

	    if (currentItem.isExpired()) {
		  currentItem.increaseQuality()
	    }
      }

	  if (isBackstagePasses) {

        currentItem.increaseQuality()

	    if (isInDoubleIncrement(currentItem)) {
	        currentItem.increaseQuality()
        }

        if (isInTripleIncrement(currentItem)) {
          currentItem.increaseQuality()
        }

	    if (currentItem.isExpired()) {
		  currentItem.resetQuality()
	    }
      }
    }
  }
}

module.exports = {
  GildedRose,
  Item
}
