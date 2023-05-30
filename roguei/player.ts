import { Entity } from "./entity.js";
import { Color } from "./primitives.js";

export class Player extends Entity {
    constructor() {
        super();

        this._color = new Color(40, 200, 60);
        this._maxHealth = 100;
        this._health = this._maxHealth;
    }
}