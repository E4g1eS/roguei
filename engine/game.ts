import { Renderer } from "./renderer.js";
import { Input } from "./input.js";
import { World } from "./world.js";
import { Debug } from "./primitives.js";

export class Game {
    private _running = true;

    private _renderer!: Renderer;
    private _input!: Input;
    private _world!: World;

    private _lastTickTime: number;

    static ElementNotFoundError = class extends Error {
        constructor(elementId: string) {
            super(`Program could not find element with id "${elementId}".`);
        }
    }

    /** Puts the game rendering into the passed div. */
    constructor(elementId: string) {
        let element = document.getElementById(elementId);
        if (!element)
            throw new Game.ElementNotFoundError(elementId);

        this.InitRenderer(element);
        this.InitInput(element);
        this.InitWorld();

        this._lastTickTime = performance.now();
    }

    private InitRenderer(element: HTMLElement) {
        this._renderer = new Renderer(800, 800, element);
    }

    private InitInput(element: HTMLElement) {
        this._input = new Input(element);
    }

    private InitWorld() {
        this._world = new World();
    }

    GameOver() {
        this._running = false;
        Debug("Game over!", 2);
    }

    Update(deltaTime: number) {
        
    }

    Draw() {
        this._renderer.Clear();
        this._renderer.RenderWorld(this._world);
    }

    Run() {
        const now = performance.now();
        
        this.Update(now - this._lastTickTime);
        this.Draw();

        this._lastTickTime = now;

        if (this._running)
            window.requestAnimationFrame(() => this.Run());
    }
}