import { Renderer } from "./renderer.js";

export class Game {

    renderer : Renderer;

    constructor(divId: string) {
        let element = document.getElementById(divId);
        this.renderer = new Renderer(800, 800, element);
    }

    run() {
        return;
    }
}