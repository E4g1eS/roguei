import { ImageLoader, MetaImage } from "./image-loader.js";
import { Color, GameEvent, Vector2 } from "./primitives.js";

export interface Component {};

export class Health implements Component {
    onHealthChange = new GameEvent();
    onDeath = new GameEvent();

    private _value: number;
    private _maxValue: number;

    constructor(max: number, current?: number) {
        this._maxValue = max;

        if (!current)
            current = max;

        this._value = current;
    }

    Damage(value: number) {
        if (value <= 0)
            return;

        this._value -= value;
        this.onHealthChange.Notify();

        if (this._value <= 0)
            this.Die();
    }

    Heal(value: number) {
        if (value <= 0 || this._value >= this._maxValue)
            return;

        this._value = Math.min(this._maxValue, this._value + value);
        this.onHealthChange.Notify();
    }

    Get() {
        return this._value;
    }

    SetMax(maxHealth: number) {
        this._maxValue = maxHealth;
        this._value = Math.min(this._value, this._maxValue);
    }

    GetMax() {
        return this._maxValue;
    }

    Die() {
        this.onDeath.Notify();
    }
}

export interface Drawable extends Component {
    GetSize(): Vector2;
    GetBitmap(): ImageBitmap;
}

export class DrawableRect implements Drawable {
    private _size: Vector2;
    private _color: Color;

    constructor(size: Vector2, color: Color) {
        this._size = size;
        this._color = color;
    }

    GetSize() {
        return this._size;
    }

    GetBitmap(): ImageBitmap {
        let data = new Uint8Array(4 * this._size.x * this._size.y);

        // TODO caching
        //for (let i = 0) 

        return new ImageBitmap();
    }
}

export class DrawableImage implements Drawable {
    _image: MetaImage;

    constructor(image: MetaImage) {
        this._image = image;
    }

    GetSize() {
        return this._image.size;
    }

    GetBitmap(): ImageBitmap {
        return ImageLoader.GetInstance().GetImageBitmap(this._image);
    }
}