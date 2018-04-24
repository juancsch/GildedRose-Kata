const assert = require('assert')
const GildedRose = require('../src/gilded_rose')
const Item = require('../src/item')

describe('Quality update specifications', function () {
  it('Los items degradan la calidad en una unidad por cada actualización', function () {
    const shop = new GildedRose([new Item('foo', 2, 3)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 2)
  })

  it('Cuando la fecha de venta a pasado, la calidad se degrada al doble de velocidad', function () {
    const shop = new GildedRose([new Item('foo', -1, 3)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 1)
  })

  it('La calidad de un item no es nunca negativa', function () {
    const shop = new GildedRose([new Item('foo', 0, 0)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 0)
  })

  it('El item "aged brie" incrementa su calidad en lugar de decrementarla según pasan los días', function () {
    const shop = new GildedRose([new Item('Aged Brie', 2, 3)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 4)
  })

  it('Cuando la fecha de venta a pasado, el item "aged brie" incrementa su calidad el doble', function () {
    const shop = new GildedRose([new Item('Aged Brie', -1, 3)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 5)
  })

  it('La calidad de un item nunca es mayor de 50', function () {
    const shop = new GildedRose([new Item('Aged Brie', 2, 50)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 50)
  })

  it('El item "Sulfuras", nuestro articulo más legendario!, nunca debe venderse ni disminuye su calidad', function () {
    const shop = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 40)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    const actualSellIn = shop.items[0].sellIn
    assert.strictEqual(actualQuality, 40)
    assert.strictEqual(actualSellIn, 10)
  })

  it('Los backstage passes incrementan su valided en dos 10 días antes de la fecha de "sell in"', function () {
    const shop = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 12)
  })

  it('Los "backstage passes" incrementan su validez en tres 5 días antes de la fecha de "sell in"', function () {
    const shop = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 13)
  })

  it('Los "backstage passes" valen 0 cuando se pasa la fecha de "sell in"', function () {
    const shop = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)])

    shop.updateQuality()

    const actualQuality = shop.items[0].quality
    assert.strictEqual(actualQuality, 0)
  })
})
