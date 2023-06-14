import { Player } from "./player.js";
import { Renderer } from "./renderer.js";
import { Input } from "./input.js";
import { Map } from "./map.js";

export class Game {
    private _running = true;

    private _renderer!: Renderer;
    private _input?: Input;

    private _player: Player;

    private _map!: Map;

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
        this.InitMap();

        this._player = new Player();
        this._player.onDeath.AddSubscriber(this.GameOver);
    }

    private InitRenderer(element: HTMLElement) {
        this._renderer = new Renderer(800, 800, element);
    }

    private InitInput(element: HTMLElement) {
        this._input = new Input(element);
    }

    private InitMap() {
        this._map = new Map();
    }

    GameOver() {
        this._running = false;
        console.log("Game over!");
    }

    Update() {

    }

    Draw() {
        this._renderer.Clear();
        this._renderer.RenderTiles(this._map.GetTiles());
    }

    Run() {
        this.Update();
        this.Draw();

        if (this._running)
            window.requestAnimationFrame(() => this.Run());
    }
}