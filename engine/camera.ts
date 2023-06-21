import { Vector2 } from "./primitives.js";

export class Camera {
    _position = new Vector2();

    GetPosition() {
        return this._position;
    }
}