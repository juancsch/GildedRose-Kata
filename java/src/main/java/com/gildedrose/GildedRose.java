package com.gildedrose;

class GildedRose {

    public static final String BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
    public static final String AGED_BRIE = "Aged Brie";
    public static final String SULFURAS = "Sulfuras, Hand of Ragnaros";

    public final Item[] items;

    private final SellinControl sellinControl;
	private final QualityControl qualityControl;

    public GildedRose(Item[] items) {

        this.items = items;

        this.sellinControl = new SellinControl();
        this.qualityControl = new QualityControl();
    }

    public void updateQuality() {
        for (Item currentItem : items) {
	        sellinControl.updateSellin(currentItem);
	        qualityControl.updateQuality(currentItem);
        }
    }

}
