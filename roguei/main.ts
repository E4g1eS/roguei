addEventListener("DOMContentLoaded", (event) => {
    main();
});

import {Game} from "./game.js";

const ELEMENT_ID = "game-div";

function main() {
    console.log("Launching...");
    let game = new Game(ELEMENT_ID);
    game.Run();
}