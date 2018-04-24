const {SULFURAS} = require('./products_names')

module.exports = function updateSellingFor (item) {
  if (item.name === SULFURAS) return
  item.decreaseSellin()
}
