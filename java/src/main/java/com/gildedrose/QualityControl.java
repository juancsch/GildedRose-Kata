package com.gildedrose;

class QualityControl {

	private static final int MINIMUN_QUALITY = 0;
	private static final int MAXIMUM_QUALITY = 50;
	private static final int DOUBLE_INCREMENT_THRESHOLD = 11;
	private static final int TRIPLE_INCREMENT_THRESHOLD = 6;
	private static final int MINIMUM_SELLIN = 0;
	private static final int QUALITY_UNIT = 1;

    public void updateQuality(Item currentItem) {

        final boolean isBackstagePasses = (GildedRose.BACKSTAGE_PASSES).equals(currentItem.name);
        final boolean notIsBackstagePasses = !isBackstagePasses;
        final boolean isAgeBrie = GildedRose.AGED_BRIE.equals(currentItem.name);
        final boolean notIsAgeBrie = !isAgeBrie;
        final boolean notSulfuras = !GildedRose.SULFURAS.equals(currentItem.name);

        if (notIsAgeBrie && notIsBackstagePasses && notSulfuras) {
            decreaseQuality(currentItem);
        }

        if (isAgeBrie) {
            increaseQuality(currentItem);
        }

        if (isBackstagePasses) {

            increaseQuality(currentItem);

            if (isItInDoubleIncrement(currentItem)) {
                increaseQuality(currentItem);
            }

            if (isItInTripleIncrement(currentItem)) {
                increaseQuality(currentItem);
            }
        }

        if (isSellinExpired(currentItem)) {

            if (notIsAgeBrie && notIsBackstagePasses && notSulfuras) {
                decreaseQuality(currentItem);
            }

            if (isBackstagePasses) {
                resetQuality(currentItem);
            }

            if (isAgeBrie) {
                increaseQuality(currentItem);
            }
        }
    }

	private boolean isItInTripleIncrement(Item currentItem) {
		return currentItem.sellIn < TRIPLE_INCREMENT_THRESHOLD;
	}

	private boolean isItInDoubleIncrement(Item currentItem) {
		return currentItem.sellIn < DOUBLE_INCREMENT_THRESHOLD;
	}

	private boolean maximumQualityReach(Item currentItem) {
		return currentItem.quality >= MAXIMUM_QUALITY;
	}

	private boolean notHasSomeQuality(Item currentItem) {
		return currentItem.quality <= MINIMUN_QUALITY;
	}

	private boolean isSellinExpired(Item currentItem) {
		return currentItem.sellIn < MINIMUM_SELLIN;
	}

	private void resetQuality(Item currentItem) {
		currentItem.quality = MINIMUN_QUALITY;
	}

	private void increaseQuality(Item item) {
		if (maximumQualityReach(item)) return;
		item.quality = item.quality + QUALITY_UNIT;
	}

	private void decreaseQuality(Item item) {
		if (notHasSomeQuality(item)) return;
		item.quality = item.quality - QUALITY_UNIT;
	}
}
