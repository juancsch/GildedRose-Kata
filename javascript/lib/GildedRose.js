
module.exports = ({updateQualityFor, updateSellingFor}) => (items = []) => {
  return {
    get items () {
      return [...items]
    },
    updateQuality () {
      items.forEach(currentItem => {
        updateSellingFor(currentItem)
        updateQualityFor(currentItem)
      })
    }
  }
}
