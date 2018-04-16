package com.gildedrose;

public class SellinControl {

	private static final int SELLIN_UNIT = 1;

	public void updateSellin(Item currentItem) {

		if (isSulfuras(currentItem)) return;

		decreaseSellin(currentItem);
	}

	private boolean isSulfuras(Item currentItem) {
		return GildedRose.SULFURAS.equals(currentItem.name);
	}

	private void decreaseSellin(Item item) {
		item.sellIn = item.sellIn - SELLIN_UNIT;
	}
}
