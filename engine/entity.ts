import { Drawable } from "./components.js";
import { Vector2 } from "./primitives.js";
import { GameEvent } from "./primitives.js";
import { Color } from "./primitives.js";

export abstract class Entity {

    onDestroy = new GameEvent();
    onPositionChange = new GameEvent();

    protected _position: Vector2 = new Vector2;

    // Components
    drawable?: Drawable;

    GetPosition() {
        return this._position;
    }

    SetPosition(newPosition: Vector2) {
        if (this._position.Equals(newPosition))
            return;

        this._position = newPosition;
        this.onPositionChange.Notify();
    }

    Destroy() {
        this.onDestroy.Notify();
    }
}