class Item {
  constructor (name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

class GildedRose {
  constructor (items) {

    this._TRIPLE_INCREMENT_THRESHOLD = 6
    this._DOUBLE_INCREMENT_THRESHOLD = 11
    this._BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
    this._SULFURAS = 'Sulfuras, Hand of Ragnaros'
    this._AGE_BRIE = 'Aged Brie'

    this._UNIT_SELLIN = 1
    this._MINIMUM_SELLIN = 0

    this._UNIT_QUALITY = 1
    this._MINIMUM_QUALITY = 0
    this._MAXIMUN_QUALITY = 50

    this.items = items
  }

  updateQuality () {

    for (const currentItem of this.items) {

      const isNotAgeBrie = currentItem.name !== this._AGE_BRIE
      const isBackstagePasses = currentItem.name === this._BACKSTAGE_PASSES
      const isNotBackstagePasses = !isBackstagePasses
      const isNotSulfuras = currentItem.name !== this._SULFURAS

      const hasSomeQuality = currentItem.quality > this._MINIMUM_QUALITY
      const maximumQualityNotReach = currentItem.quality < this._MAXIMUN_QUALITY
      const isInDoubleIncrement = currentItem.sellIn < this._DOUBLE_INCREMENT_THRESHOLD
      const isInTripleIncrement = currentItem.sellIn < this._TRIPLE_INCREMENT_THRESHOLD

      if (isNotAgeBrie && isNotBackstagePasses) {

        if (hasSomeQuality) {
          if (isNotSulfuras) {
            currentItem.quality = currentItem.quality - this._UNIT_QUALITY
          }
        }

      } else {

        if (maximumQualityNotReach) {

          currentItem.quality = currentItem.quality + this._UNIT_QUALITY

          if (isBackstagePasses) {

            if (isInDoubleIncrement) {
              if (maximumQualityNotReach) {
                currentItem.quality = currentItem.quality + this._UNIT_QUALITY
              }
            }

            if (isInTripleIncrement) {
              if (maximumQualityNotReach) {
                currentItem.quality = currentItem.quality + this._UNIT_QUALITY
              }
            }
          }
        }
      }

      if (isNotSulfuras) {
        currentItem.sellIn = currentItem.sellIn - this._UNIT_SELLIN
      }

      if (currentItem.sellIn < this._MINIMUM_SELLIN) {

        if (isNotAgeBrie) {

          if (isNotBackstagePasses) {

            if (hasSomeQuality) {

              if (isNotSulfuras) {
                currentItem.quality = currentItem.quality - this._UNIT_QUALITY
              }

            }

          } else {
            currentItem.quality = currentItem.quality - currentItem.quality
          }

        } else {

          if (maximumQualityNotReach) {
            currentItem.quality = currentItem.quality + this._UNIT_QUALITY
          }
        }
      }
    }
  }
}

module.exports = {
  Item,
  GildedRose
}
