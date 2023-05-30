addEventListener("DOMContentLoaded", (event) => {
    main();
});

import {Game} from "./game.js";

function main() {
    console.log("Launching...");
    let game = new Game("game-div");
    game.run();
}