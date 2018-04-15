package com.gildedrose;

class GildedRose {

    // ctes
    private static final String BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
    private static final String AGED_BRIE = "Aged Brie";
    private static final String SULFURAS = "Sulfuras, Hand of Ragnaros";

    // nº magic
    private static final int MINIMUN_QUALITY = 0;
    private static final int MAXIMUM_QUALITY = 50;
    private static final int DOUBLE_INCREMENT_THRESHOLD = 11;
    private static final int TRIPLE_INCREMENT_THRESHOLD = 6;
    private static final int MINIMUM_SELLIN = 0;
    private static final int SELLIN_UNIT = 1;
    private static final int QUALITY_UNIT = 1;

    public final Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {

        for (Item currentItem : items) {

            // temp var
            final boolean isBackstagePasses = (BACKSTAGE_PASSES).equals(currentItem.name);
            final boolean notIsBackstagePasses = !isBackstagePasses;
            final boolean isAgeBrie = AGED_BRIE.equals(currentItem.name);
            final boolean notIsAgeBrie = !isAgeBrie;
            final boolean notSulfuras = !SULFURAS.equals(currentItem.name);

            if (notIsAgeBrie && notIsBackstagePasses && notSulfuras && hasSomeQuality(currentItem)) {
                decreaseQuality(currentItem);
            }

            if ((isAgeBrie || isBackstagePasses) && maximumQualityNotReach(currentItem)) {

                increaseQuality(currentItem);

                if (isBackstagePasses && isItInDoubleIncrement(currentItem)) {
                    increaseQuality(currentItem);
                }

                if (isBackstagePasses && isItInTripleIncrement(currentItem)) {
                    increaseQuality(currentItem);
                }
            }

            if (notSulfuras) {
                decreaseSellin(currentItem);
            }

            if (isSellinExpired(currentItem)) {

                if (notIsAgeBrie && notIsBackstagePasses && notSulfuras && hasSomeQuality(currentItem)) {
                    decreaseQuality(currentItem);
                }

                if (notIsAgeBrie && isBackstagePasses) {
                    resetQuality(currentItem);
                }

                if (isAgeBrie && maximumQualityNotReach(currentItem)) {
                    increaseQuality(currentItem);
                }
            }
        }
    }

    // queries ...
    private boolean isItInTripleIncrement(Item currentItem) {
        return currentItem.sellIn < TRIPLE_INCREMENT_THRESHOLD;
    }

    private boolean isItInDoubleIncrement(Item currentItem) {
        return currentItem.sellIn < DOUBLE_INCREMENT_THRESHOLD;
    }

    private boolean maximumQualityNotReach(Item currentItem) {
        return currentItem.quality < MAXIMUM_QUALITY;
    }

    private boolean hasSomeQuality(Item currentItem) {
        return currentItem.quality > MINIMUN_QUALITY;
    }
    private boolean isSellinExpired(Item currentItem) {
        return currentItem.sellIn < MINIMUM_SELLIN;
    }

    // commands ...
    private void decreaseSellin(Item item) {
        item.sellIn = item.sellIn - SELLIN_UNIT;
    }

    private void resetQuality(Item currentItem) {
        currentItem.quality = MINIMUN_QUALITY;
    }

    private void increaseQuality(Item item) {
        item.quality = item.quality + QUALITY_UNIT;
    }

    private void decreaseQuality(Item item) {
        item.quality = item.quality - QUALITY_UNIT;
    }
}
