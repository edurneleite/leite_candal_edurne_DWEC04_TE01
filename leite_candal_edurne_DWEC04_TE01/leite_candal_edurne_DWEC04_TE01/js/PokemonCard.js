export class PokemonCard {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.types = data.types;
        this.hp = data.hp;
        this.rarity = data.rarity;
        this.artist = data.artist;
        this.set = data.set;
        this.images = data.images;
        this.cardmarket = data.cardmarket;
    }

    get trendPrice() {
        return this.cardmarket.prices.trendPrice;
    }

    get reverseHoloTrendPrice() {
        return this.cardmarket.prices.reverseHoloTrend;
    }
}
