addEventListener("DOMContentLoaded", (event) => {
    main();
});

import { Game } from "./game.js";
import { ImageLoader } from "./image-loader.js";

const ELEMENT_ID = "game-div";

function main() {
    console.log("Loading images...");
    const imageLoader = ImageLoader.GetInstance();
    imageLoader.LoadAll().then( () => {
        console.log("Launching...");
        const game = new Game(ELEMENT_ID);
        game.Run();
    });
}