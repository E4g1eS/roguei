import * as ENGINE from "../engine/engine.js";

class Grass extends ENGINE.TileTemplate {

    constructor(representation = ",") {
        super(representation);

        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("grass.png");
    }
}

class Mountains extends ENGINE.TileTemplate {

    constructor(representation = "^") {
        super(representation);

        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("mountains.png");
    }
}

class Sand extends ENGINE.TileTemplate {

    constructor(representation = ".") {
        super(representation);

        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("sand.png");
    }
}

class Snow extends ENGINE.TileTemplate {

    constructor(representation = "_") {
        super(representation);

        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("snow.png");
    }
}

class Trees extends ENGINE.TileTemplate {

    constructor(representation = "|") {
        super(representation);

        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("trees.png");
    }
}

class Water extends ENGINE.TileTemplate {

    constructor(representation = "~") {
        super(representation);
        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("water.png");
    }
}

class DeepWater extends ENGINE.TileTemplate {
    constructor(representation = "w") {
        super(representation);
        this._image = ENGINE.ImageLoader.GetInstance().GetImageReference("deep-water.png");
    }
}

function LinkTileTemplates(tileTemplate1: ENGINE.TileTemplate, tileTemplate2: ENGINE.TileTemplate) {
    tileTemplate1.constraints.add(tileTemplate2);

    if (tileTemplate1 === tileTemplate2)
        return;

    tileTemplate2.constraints.add(tileTemplate1);
} 

export function CreateTileset() {
    const tileset = new Set<ENGINE.TileTemplate>();

    // Possible to automate it / load it from config file.
    let grass = new Grass();
    LinkTileTemplates(grass, grass);
    let mountains = new Mountains();
    LinkTileTemplates(mountains, mountains);
    let sand = new Sand();
    LinkTileTemplates(sand, sand);
    let snow = new Snow();
    LinkTileTemplates(snow, snow);
    let trees = new Trees();
    LinkTileTemplates(trees, trees);
    let water = new Water();
    LinkTileTemplates(water, water);
    let deepWater = new DeepWater();
    LinkTileTemplates(deepWater, deepWater);

    LinkTileTemplates(grass, trees);
    LinkTileTemplates(grass, sand);
    
    LinkTileTemplates(mountains, trees);
    LinkTileTemplates(mountains, snow);
    LinkTileTemplates(mountains, sand);
    LinkTileTemplates(mountains, water);

    LinkTileTemplates(sand, trees);
    LinkTileTemplates(sand, water);

    LinkTileTemplates(snow, trees);

    LinkTileTemplates(deepWater, water);

    tileset.add(grass);
    tileset.add(mountains);
    tileset.add(sand);
    tileset.add(snow);
    tileset.add(trees);
    tileset.add(water);
    tileset.add(deepWater);
    return tileset;
}