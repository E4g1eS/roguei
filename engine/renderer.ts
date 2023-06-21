import { ImageLoader } from "./image-loader.js";
import { CANVAS_ID } from "./primitives.js";
import { Vector2 } from "./primitives.js";
import { Tile } from "./tile.js";

const CLEAR_COLOR = "#FFFFFF";

class TileWindow {
    /** Size (relative) to whole canvas. */
    private _tileWindowSize: Vector2;
    /** Offset (from left, up) (relative) to whole canvas. */
    private _tileWindowOffset: Vector2;

    /**
     * Initilizes TileWindow.
     * @param tileWindowSize Relative size to the rest of the canvas [0-1].
     * @param tileWindowOffset Relative offset [0-1].
     */
    constructor(tileWindowSize: Vector2, tileWindowOffset: Vector2 = new Vector2()) {
        this._tileWindowSize = tileWindowSize;
        this._tileWindowOffset = tileWindowOffset;
    }
}

export class Renderer {

    private _context: CanvasRenderingContext2D;
    private _tileWindow: TileWindow;

    constructor(width: number, height: number, element: HTMLElement | null = null) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        if (!context)
            throw new Renderer.No2DContextError();

        this._context = context;
        this._context.canvas.width = width;
        this._context.canvas.height = height;
        this._context.canvas.id = CANVAS_ID;

        this._tileWindow = new TileWindow(new Vector2(1, 1));

        if (element)
            element.appendChild(this._context.canvas);

        else
            document.body.appendChild(this._context.canvas);
    }

    static No2DContextError = class extends Error {
        constructor() {
            super("Program could not create 2D context on canvas element.");
        }
    }

    Clear() {
        this._context.fillStyle = CLEAR_COLOR;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }

    RenderTiles(tiles: Tile[][]) {
        const columns = tiles.length;
        const rows = tiles[0].length;

        const tileSize = new Vector2(this._context.canvas.width / columns, this._context.canvas.height / rows);

        for (let x = 0; x < columns; x++)
        {
            for (let y = 0; y < rows; y++)
            {
                const tile = tiles[x][y];
                const image = tile.template.GetImage();

                if (!image)
                {
                    console.log(`Fallback draw: ${tile.template.fallbackText}`);
                    continue;
                }

                const bitmap = ImageLoader.GetInstance().GetImageBitmap(image);
                this._context.drawImage(bitmap, x * tileSize.x, y * tileSize.y, tileSize.x, tileSize.y);
            }
        }
    }
}