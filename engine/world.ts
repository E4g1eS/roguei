import { Tile, TileTemplate } from "./tile.js";
import { Vector2, RandomInt, Debug } from "./primitives.js";
import { CreateTileset } from "../roguei/tile-types.js";
import { Player } from "./player.js";
import { Entity } from "./entity.js";

class CollapsingTile {
    private _possibilities: Set<TileTemplate> = new Set();

    Entropy() {
        return this._possibilities.size;
    }

    Collapse() {
        let randomIndex = RandomInt(this._possibilities.size);
        let i = 0;
        let randomTemplate = null;
        for (let possibility of this._possibilities) {
            if (randomIndex === i) {
                randomTemplate = possibility;
                break;
            }
            i++;
        }

        if (!randomTemplate)
            throw new Error("Should not happen");

        this._possibilities = new Set<TileTemplate>().add(randomTemplate);
    }

    GetCollapsed() {
        if (this._possibilities.size !== 1)
            return null;

        return this._possibilities.values().next().value;
    }

    IsCollapsed() {
        return this._possibilities.size === 1;
    }

    AddPosibility(possibility: TileTemplate) {
        this._possibilities.add(possibility);
    }

    /**
     * Adjusts possibilities based on neighbor constrainst.
     * @param neighbor Tile directly next to this.
     * @returns True when possibilities were modified.
     */
    AdjustPossibilities(neighbor: CollapsingTile) {
        let newPossibilities = new Set<TileTemplate>();

        neighbor._possibilities.forEach(neighborTemplates => {
            neighborTemplates.constraints.forEach(constraint => {
                if (this._possibilities.has(constraint))
                    newPossibilities.add(constraint);
            });
        });

        let modified = (this._possibilities.size !== newPossibilities.size);

        this._possibilities = newPossibilities;

        return modified;
    }
}

export class World {
    private _tiles: Tile[][];
    private _entities: Entity[];
    private _player: Player;

    constructor(size: number = 20) {
        this._entities = new Array<Entity>();
        this._player = new Player();

        this._tiles = [];

        let tileTemplates = CreateTileset();
        Debug(tileTemplates, 5);

        let tiles = this.WaveFunctionCollapse(tileTemplates, size);

        if (tiles)
            this._tiles = tiles;

        Debug("Map initilized!", 5);
        Debug(this, 8);
        this.PrintTiles();
    }

    GetTiles() {
        return this._tiles;
    }

    PrintTiles() {
        let result = "";

        this._tiles.forEach(tileColumn => {
            tileColumn.forEach(tile => {
                result += tile.template.fallbackText;
            });

            result += "\n";
        });

        Debug(result, 7);
    }
    
    private WaveFunctionCollapse(tileTemplates: Set<TileTemplate>, size: number) {
        
        let possibilities = new Array<CollapsingTile[]>(size);
        for (let x = 0; x < size; x++) {
            possibilities[x] = new Array<CollapsingTile>(size);

            for (let y = 0; y < size; y++) {
                possibilities[x][y] = new CollapsingTile();
                tileTemplates.forEach(tileTemplate => {
                    possibilities[x][y].AddPosibility(tileTemplate);
                });
            }
        }

        while (true) {
            // Find lowest entropy
            let lowestEntropyPosition = this.FindLowestEntropy(possibilities);
            let lowestEntropyTile = possibilities[lowestEntropyPosition.x][lowestEntropyPosition.y];
            let lowestEntropy = lowestEntropyTile.Entropy();

            // End if at end
            if (lowestEntropy == 0)
            {
                Debug("Failed WFC", 3);
                return null;
            }

            if (lowestEntropy == 1)
            {
                Debug("Finished WFC", 3);
                break;
            }

            // Collapse
            lowestEntropyTile.Collapse();
            this.Propagate(possibilities, lowestEntropyTile, new Vector2(lowestEntropyPosition.x + 1, lowestEntropyPosition.y));
            this.Propagate(possibilities, lowestEntropyTile, new Vector2(lowestEntropyPosition.x - 1, lowestEntropyPosition.y));
            this.Propagate(possibilities, lowestEntropyTile, new Vector2(lowestEntropyPosition.x, lowestEntropyPosition.y + 1));
            this.Propagate(possibilities, lowestEntropyTile, new Vector2(lowestEntropyPosition.x, lowestEntropyPosition.y - 1));
        }

        Debug(possibilities, 8);

        let tiles = new Array<Tile[]>();
        possibilities.forEach((possibilitiesColumn, x) => {
            tiles.push(new Array<Tile>());
            possibilitiesColumn.forEach((possibilitiesTile) => {
                let template = possibilitiesTile.GetCollapsed();

                if (template === null)
                    throw new Error("Wave function collapse is broken.");

                tiles[x].push(new Tile(template));
            });
        });

        return tiles;
    }

    private Propagate(possibilities: CollapsingTile[][], sourceTile: CollapsingTile, position: Vector2) {
        let size = possibilities.length;
        if (position.x < 0 || position.x >= size || position.y < 0 || position.y >= size)
            return;

        let propagatingTile = possibilities[position.x][position.y];

        let adjusted = propagatingTile.AdjustPossibilities(sourceTile);

        if (!adjusted)
            return;

        this.Propagate(possibilities, propagatingTile, new Vector2(position.x + 1, position.y));
        this.Propagate(possibilities, propagatingTile, new Vector2(position.x - 1, position.y));
        this.Propagate(possibilities, propagatingTile, new Vector2(position.x, position.y + 1));
        this.Propagate(possibilities, propagatingTile, new Vector2(position.x, position.y - 1));
    }

    private FindLowestEntropy(possibilities: CollapsingTile[][]) {
        let size = possibilities.length;
        let result = new Vector2(Math.floor(size/2), Math.floor(size/2));
        let minEntropy = possibilities[result.x][result.y].Entropy();

        possibilities.forEach((possibilitiesColumn, x) => {
            possibilitiesColumn.forEach((possibilitiesTile, y) => {
                let entropy = possibilitiesTile.Entropy();

                if (entropy >= minEntropy) {
                    minEntropy = entropy;
                    result = new Vector2(x, y);
                }
            });
        });

        return result;
    }
}