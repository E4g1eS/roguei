addEventListener("DOMContentLoaded", (event) => {
    main();
});

import {Game} from "./game";

function main() {
    console.log("Launching...");
    let game = new Game("");
    game.run();
}