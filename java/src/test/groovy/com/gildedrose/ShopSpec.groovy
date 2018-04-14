package com.gildedrose

import spock.lang.Specification

class ShopSpec extends Specification {

    def 'Los items degradan la calidad en una unidad por cada actualización'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('foo', 2, 3)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 1
    }

    def 'Cuando la fecha de venta a pasado, la calidad se degrada al doble de velocidad'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('foo', -1, 3)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 1
    }

    def 'La calidad de un item no es nunca negativa'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('foo',  0, 0)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 0
    }

    def 'El item "aged brie" incrementa su calidad en lugar de decrementarla según pasan los días'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Aged Brie', 2, 3)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 4
    }

    def 'Cuando la fecha de venta a pasado, el item "aged brie" incrementa su calidad el doble'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Aged Brie', -1, 3)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 5
    }

    def 'La calidad de un item nunca es mayor de 50'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Aged Brie', 2, 50)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 50
    }

    def 'El item "Sulfuras", nuestro articulo más legendario!, nunca debe venderse ni disminuye su calidad'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 40)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 40
    }

    def 'Los "backstage passes" incrementan su valided en dos 10 días antes de la fecha de "sell in"'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 12
    }

    def 'Los "backstage passes" incrementan su validez en tres 5 días antes de la fecha de "sell in"'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 13
    }

    def 'Los "backstage passes" valen 0 cuando se pasa la fecha de "sell in"'() {

        given: 'the application with these items'
        Shop shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)] as Item[])

        when: 'updating quality'
        shop.updateQuality()

        then: 'the quality is correct'
        shop.items[0].quality == 0
    }

//    @Unroll
//    def 'should update quality correctly'() {
//
//        given: 'the application with these items'
//        Shop shop = new Shop(items)
//
//        when: 'updating quality'
//        shop.updateQuality()
//
//        then: 'the quality is correct'
//        shop.items[0].quality == qualityExpected
//
//        where: ''
//        items                                                                                         || qualityExpected
//        [new Item('foo', 2, 3)] as Item[]                                           || 2
//        [new Item('foo',  -1, 3)] as Item[]                                         || 1
//        [new Item('foo', 0, 0)] as Item[]                                           || 0
//        [new Item('Aged Brie', 2, 3)] as Item[]                                     || 4
//        [new Item('Aged Brie', 2, 50)] as Item[]                                    || 50
//        [new Item('Sulfuras, Hand of Ragnaros', 10, 40)] as Item[]                  || 40
//        [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)] as Item[]   || 12
//        [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)] as Item[]    || 13
//        [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)] as Item[]    || 0
//    }
}
