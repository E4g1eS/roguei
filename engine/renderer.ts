import { Entity } from "./entity.js";
import { ImageLoader } from "./image-loader.js";
import { CANVAS_ID } from "./primitives.js";
import { Vector2 } from "./primitives.js";
import { EntityLayer, World } from "./world.js";

/** WIP for multiwindow rendering */
class Window {
    /** Size (relative) to whole parent [0-1]. */
    private _size: Vector2;
    /** Offset (from left, up) (relative) to parent [0-1]. */
    private _offset: Vector2;

    constructor(size: Vector2, offset: Vector2) {
        this._size = size;
        this._offset = offset;
    }
}

export class Renderer {

    private _clearColor = "#FFFFFF";
    private _context: CanvasRenderingContext2D;
    private _centerOffset: Vector2;

    constructor(width: number, height: number, element: HTMLElement | null = null) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        if (!context)
            throw new Renderer.No2DContextError();

        this._context = context;
        this._context.canvas.width = width;
        this._context.canvas.height = height;
        this._context.canvas.id = CANVAS_ID;

        this._centerOffset = new Vector2(width / 2, height / 2);

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
        this._context.fillStyle = this._clearColor;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }

    private IsInBounds(point: Vector2) {
        if (
            point.x < 0
            || point.y < 0
            || point.x >= this._context.canvas.width
            || point.y >= this._context.canvas.height
        ) {
            return false;
        }

        return true;
    }

    private RenderEntity(world: World, entity: Entity) {
        if (!entity.drawable)
            return;

        const drawPosition = world.GetCamera().GetPosition().Subtract(entity.GetPosition()).Add(this._centerOffset);
        const drawPositionEnd = drawPosition.Add(entity.drawable.GetSize());

        if (
            drawPosition.x >= this._context.canvas.width
            || drawPosition.y >= this._context.canvas.height
            || drawPositionEnd.x < 0
            || drawPositionEnd.y < 0
        ) {
            return;
        }
    }

    private RenderLayer(world: World, layer: EntityLayer) {
        for (const entity of layer.GetEntities())
            this.RenderEntity(world, entity);
    }

    private RenderLayers(world: World) {
        for (const layer of world.GetEntityLayers())
            this.RenderLayer(world, layer);
    }

    RenderWorld(world: World) {
        this.RenderLayers(world);
    }
}