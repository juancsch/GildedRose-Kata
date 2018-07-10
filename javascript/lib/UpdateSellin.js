const {SULFURAS} = require('./ProductNames')

module.exports = function updateSellingFor (item) {
  if (item.name === SULFURAS) return
  item.decreaseSellin()
}
