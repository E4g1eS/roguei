import { CANVAS_ID } from "./primitives.js";
import { Debug } from "./primitives.js";

export class Input {
    constructor(element: HTMLElement) {

        let canvas = document.getElementById(CANVAS_ID);
        if (!canvas)
            return;

        canvas.tabIndex = 0;
        canvas.addEventListener("keydown", event => {
            if (event.code === "Tab")
                return;

            event.preventDefault();
            this.PressedKey(event.code)
        });
    }

    private PressedKey(code: string) {
        Debug(`Pressed "${code}"`, 10);
    }
}