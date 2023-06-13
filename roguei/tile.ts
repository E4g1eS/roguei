/**
 * Prototype for a tile.
 */ 
export class TileTemplate {
    representation: string;
    constraints: Set<TileTemplate>;

    constructor(representation: string) {
        this.representation = representation;
        this.constraints = new Set();
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
