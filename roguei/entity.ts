import { Vector2 } from "./primitives.js";
import { GameEvent } from "./primitives.js";

export abstract class Entity {
    onDeath: GameEvent = new GameEvent();
    onPositionChanged: GameEvent = new GameEvent();
    onHealthChanged: GameEvent = new GameEvent();

    position: Vector2 = new Vector2;
    health: number = 0;
    healthMax: number = 0;

    constructor() {
        this.onDeath.AddSubscriber(this.OnDeath);
        this.onPositionChanged.AddSubscriber(this.OnPositionChanged);
        this.onHealthChanged.AddSubscriber(this.OnHealthChanged);
    }

    Damage(value: number) {
        if (value <= 0)
            return;

        this.health -= value;
        this.onHealthChanged.Notify();

        if (this.health <= 0)
            this.Die();
    }

    Heal(value: number) {
        if (value <= 0 || this.health >= this.healthMax)
            return;

        this.health = Math.min(this.healthMax, this.health + value);
        this.onHealthChanged.Notify();
    }

    protected Die() {
        this.onDeath.Notify();
    }

    protected OnDeath() {}
    protected OnPositionChanged() {}
    protected OnHealthChanged() {}
}