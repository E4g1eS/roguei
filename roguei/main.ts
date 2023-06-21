addEventListener("DOMContentLoaded", (event) => {
    main();
});

import * as ENGINE from "../engine/engine.js";

const ELEMENT_ID = "game-div";

function main() {
    ENGINE.Debug("Loading images...", 3);
    const imageLoader = ENGINE.ImageLoader.GetInstance();
    imageLoader.LoadAll().then( () => {
        ENGINE.Debug("Launching...", 1);
        const game = new ENGINE.Game(ELEMENT_ID);
        game.Run();
    });
}