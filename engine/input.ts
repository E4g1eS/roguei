import { CANVAS_ID } from "./primitives.js";
import { Debug } from "./primitives.js";

export class Input {
    /** Stores keyCode -> time of press. */
    private _currentlyPressed = new Map<string, number>();
    /** Stores keyCode -> sum of length of press. */
    private _memory = new Map<string, number>();

    constructor(element: HTMLElement) {

        let canvas = document.getElementById(CANVAS_ID);
        if (!canvas)
            return;

        // Canvas is focusable.
        canvas.tabIndex = 0;

        canvas.addEventListener("keydown", event => {
            if (event.code === "Tab")
                return;

            event.preventDefault();
            this.PressedKey(event.code, performance.now())
        });

        canvas.addEventListener("keyup", (event) => {
            if (event.code === "Tab")
                return;

            event.preventDefault();
            this.ReleasedKey(event.code, performance.now());
        });
    }

    /**
     * Get pressed keys.
     * @param reset If true, resets memory of keypresses.
     * @returns Map with [keyCode -> sum of time the key was pressed]. Defaults to true.
     */
    GetKeys(reset: boolean = true) {
        const toReturn = this._memory;

        if (!reset)
            return;

        for (const key of this._currentlyPressed.keys())
            this._currentlyPressed.set(key, 0);

        this._memory = new Map<string, number>();
    }

    private PressedKey(code: string, timestamp: number) {
        this._currentlyPressed.set(code, timestamp);
    }

    private ReleasedKey(code: string, timestamp: number) {
        const pressedAt = this._currentlyPressed.get(code);

        if (!pressedAt)
            return;

        let sum = this._memory.get(code);

        if (!sum)
            sum = 0;

        sum += timestamp - pressedAt;
        this._memory.set(code, sum);
    }
}