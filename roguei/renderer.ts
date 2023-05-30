export class Renderer {

    _context: CanvasRenderingContext2D | null;

    constructor(width: number, height: number, element: HTMLElement | null = null) {
        let canvas = document.createElement("canvas");
        this._context = canvas.getContext("2d");

        if (!this._context)
            throw new Renderer.No2DContextError();

        this._context.canvas.width = width;
        this._context.canvas.height = height;
        this._context.canvas.id = "game-canvas";

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