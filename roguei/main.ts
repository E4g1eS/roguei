addEventListener("DOMContentLoaded", (event) => {
    main();
});

import { Game } from "./game.js";
import { ImageLoader } from "./image-loader.js";
import { Debug } from "./primitives.js";

const ELEMENT_ID = "game-div";

function main() {
    Debug("Loading images...", 3);
    const imageLoader = ImageLoader.GetInstance();
    imageLoader.LoadAll().then( () => {
        Debug("Launching...", 1);
        const game = new Game(ELEMENT_ID);
        game.Run();
    });
}