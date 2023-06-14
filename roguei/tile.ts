import { DrawableImage } from "./image-loader.js";

/**
 * Prototype for a tile.
 */ 
export class TileTemplate {
    fallbackText: string;
    constraints: Set<TileTemplate>;
    protected _image: DrawableImage | null;

    constructor(representation: string) {
        this.fallbackText = representation;
        this.constraints = new Set();
        this._image = null;
    }

    GetImage() {
        return this._image;
    }
}

/**
 * Represents one tile in a map.
 */
export class Tile {
    template: TileTemplate;

    constructor(template: TileTemplate) {
        this.template = template;
    }
}
