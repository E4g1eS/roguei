export class Input {
    constructor(element: HTMLElement) {

        let canvas = document.getElementById("game-canvas");
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
        console.log(`Pressed "${code}"`);
    }
}