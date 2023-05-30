export const CANVAS_ID = "game-canvas";

export class Vector2 {

    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    Add(other: Vector2) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    AddInplace(other: Vector2) {
        this.x += other.x;
        this.y += other.y;
    }

    Multiply(multiplier: number) {
        return new Vector2(this.x * multiplier, this.y * multiplier);
    }

    MultiplyInplace(multiplier: number) {
        this.x *= multiplier;
        this.y *= multiplier;
    }

    Dot(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }

    Length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    Normalized() {
        return this.Multiply(1 / this.Length());
    }

    /** Normalizes inplace. */
    Normalize() {
        this.MultiplyInplace(1 / this.Length());
    }

    /** Returns angle between two vectors in radians. */
    Angle(other: Vector2) {
        return Math.acos(this.Normalized().Dot(other.Normalized()));
    }

    Equals(other: Vector2) {
        return this.x === other.x && this.y === other.y;
    }
}

export class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    /** RGB in 0-255, Alpha on 0.0 (transparent) - 1.0 (fully visible). */
    constructor(red = 255, green = 28, blue = 206, alpha = 1) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }

    Hex() {
        return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`
    }

    RGB() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    RGBA() {
        return `rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

export class GameEvent {
    private _subscribers: (() => any)[];

    constructor() {
        this._subscribers = [];
    }

    /** Adds a subscriber function. */
    AddSubscriber(func: () => any) {
        this._subscribers.push(func);
    }

    /** Returns true if successfully removes a subscriber function. */
    RemoveSubscriber(func: () => any) {

        let found = false;
        this._subscribers.forEach((subscriber, index) => {
            if (subscriber.toString() === func.toString())
            {
                [this._subscribers[this._subscribers.length - 1], this._subscribers[index]] = [this._subscribers[index], this._subscribers[this._subscribers.length - 1]];
                this._subscribers.pop();
                found = true;
                return;
            }
        });

        return found;
    }

    Notify() {
        this._subscribers.forEach(subscriber => {
            subscriber();
        });
    }
}