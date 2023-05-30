import { Vector2 } from "./primitives.js";
import { GameEvent } from "./primitives.js";
import { Color } from "./primitives.js";

export abstract class Entity {
    onDeath: GameEvent = new GameEvent();
    onPositionChanged: GameEvent = new GameEvent();
    onHealthChanged: GameEvent = new GameEvent();

    protected _position: Vector2 = new Vector2;
    protected _health: number = 0;
    protected _maxHealth: number = 0;

    protected _color: Color = new Color();

    constructor() {
        this.onDeath.AddSubscriber(this.OnDeath);
        this.onPositionChanged.AddSubscriber(this.OnPositionChanged);
        this.onHealthChanged.AddSubscriber(this.OnHealthChanged);
    }

    Damage(value: number) {
        if (value <= 0)
            return;

        this._health -= value;
        this.onHealthChanged.Notify();

        if (this._health <= 0)
            this.Die();
    }

    Heal(value: number) {
        if (value <= 0 || this._health >= this._maxHealth)
            return;

        this._health = Math.min(this._maxHealth, this._health + value);
        this.onHealthChanged.Notify();
    }

    GetHealth() {
        return this._health;
    }

    GetMaxHealth() {
        return this._maxHealth;
    }

    GetPosition() {
        return this._position;
    }

    SetPosition(newPosition: Vector2) {
        if (this._position.Equals(newPosition))
            return;
        
        this._position = newPosition;
        this.onPositionChanged.Notify();
    }

    protected Die() {
        this.onDeath.Notify();
    }

    protected OnDeath() { }
    protected OnPositionChanged() { }
    protected OnHealthChanged() { }
}