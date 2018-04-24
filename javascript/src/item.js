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

module.exports = Item
