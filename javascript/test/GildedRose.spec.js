const fs = require('fs')
const path = require('path')
const assert = require('assert')
const randomSeed = require('random-seed')
const {Item, GildedRose} = require('../src/gilded_rose')

describe('Gilded Rose golden master specification', function () {

  const goldenMasterDataPath = path.resolve('test', 'fixture', 'golden_master.txt')

  xit('should generate golden master output', function () {

    const data = runGildedRose()

    fs.writeFileSync(goldenMasterDataPath, data, 'utf8')
  })

  it('should be true', function () {

    const actual = runGildedRose()
    const expected = fs.readFileSync(goldenMasterDataPath, 'utf8')

    assert.strictEqual(actual, expected)
  })

  function runGildedRose () {

    function stringRepresentationFor (items) {
      return items
        .map(item => item.toString())
        .join('\n')
    }

    const items = generateRandomItems()
    new GildedRose(items).updateQuality()

    return stringRepresentationFor(items)
  }
})

function generateRandomItems (totalNumberOfRandomItems = 2000, seed = 100) {
  const MINIMUM = -50;
  const MAXIMUN = 101;
  const itemNames = [
    '+5 Dexterity Vest',
    'Aged Brie',
    'Elixir of the Mongoose',
    'Sulfuras, Hand of Ragnaros',
    'Backstage passes to a TAFKAL80ETC concert',
    'Conjured Mana Cake'
  ]

  const rand = randomSeed.create(seed)

  function itemName () {
    return itemNames[0 + rand.range(itemNames.length)]
  }

  function sellIn () {
    return randomNumberBetween(MINIMUM, MAXIMUN)
  }

  function quality () {
    return randomNumberBetween(MINIMUM, MAXIMUN)
  }

  function randomNumberBetween (minimum, maximum) {
    return minimum + rand.range(maximum)
  }

  const items = []
  for (let cnt = 0; cnt < totalNumberOfRandomItems; cnt++) {
    items.push(new Item(itemName(), sellIn(), quality()))
  }
  return items
}
