package com.gildedrose

import org.scalatest._

class ShopSpec extends FunSuite with Matchers {

  test("'Los items degradan la calidad en una unidad por cada actualización") {

    val shop = new Shop(Array[Item](new Item("foo", 2, 3)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 2
  }

  test("Cuando la fecha de venta a pasado, la calidad se degrada al doble de velocidad") {

    val shop = new Shop(Array[Item](new Item("foo", -1, 3)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 1
  }

  test("La calidad de un item no es nunca negativa") {

    val shop = new Shop(Array[Item](new Item("foo", 0, 0)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 0
  }

  test("El item 'aged brie')crementa su calidad en lugar de decrementarla según pasan los días") {

    val shop = new Shop(Array[Item](new Item("Aged Brie", 2, 3)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 4
  }

  test("La calidad de un item nunca es mayor de 50") {

    val shop = new Shop(Array[Item](new Item("Aged Brie", 2, 50)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 50
  }

  test("El item 'Sulfuras', nuestro articulo más legendario!, nunca debe venderse ni disminuye su calidad") {

    val shop = new Shop(Array[Item](new Item("Sulfuras, Hand of Ragnaros", 10, 40)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 40
  }

  test("Los backstage passes)crementan su valided en dos 10 días antes de la fecha de 'sell)'") {

    val shop = new Shop(Array[Item](new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 12
  }

  test("Los 'backstage passes')crementan su validez en tres 5 días antes de la fecha de 'sell)'") {

    val shop = new Shop(Array[Item](new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 13
  }

  test("Los 'backstage passes' valen 0 cuando se pasa la fecha de 'sell)'") {

    val shop = new Shop(Array[Item](new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)))

    shop.updateQuality()

    shop.items(0).quality shouldBe 0
  }
}
