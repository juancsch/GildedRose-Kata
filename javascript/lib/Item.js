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

function Item (name = '', sellIn = 0, quality = 0) {
  return {
    get name () {
      return name
    },
    get sellIn () {
      return sellIn
    },
    get quality () {
      return quality
    },
    isExpired () {
      return sellIn < MINIMUM_SELLIN
    },
    decreaseSellin () {
      sellIn = sellIn - UNIT_SELLIN
    },
    resetQuality () {
      quality = MINIMUM_QUALITY
    },
    increaseQuality () {
      if (maximumQualityReach(quality)) return
      quality = quality + UNIT_QUALITY
    },
    decreaseQuality () {
      if (hasNotSomeQuality(quality)) return
      quality = quality - UNIT_QUALITY
    }
  }
}

module.exports = Item
