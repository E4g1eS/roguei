import { CANVAS_ID } from "./primitives.js";
import { Vector2 } from "./primitives.js";

class TileWindow {
    /** Size (relative) to whole canvas. */
    private _tileWindowSize: Vector2;
    /** Offset (from left, up) (relative) to whole canvas. */
    private _tileWindowOffset: Vector2;

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
}