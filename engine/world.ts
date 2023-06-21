import { Entity } from "./entity.js";
import { Camera } from "./camera.js";

export class EntityLayer {
    private _entities = new Set<Entity>();

    GetEntities() {
        return this._entities;
    }

    AddEntity(entity: Entity) {
        this._entities.add(entity);
        entity.onDestroy.AddSubscriber(() => {
            this._entities.delete(entity);
        });
    }
}

export class World {
    private _camera = new Camera();
    /** Layers for rendering purposes. */
    private _entities: EntityLayer[];

    constructor(numberOfLayers: number = 9) {
        this._entities = new Array<EntityLayer>(numberOfLayers);
    }

    AddEntity(entity: Entity, layer: number) {
        this._entities[layer].AddEntity(entity);
    }

    GetCamera() {
        return this._camera;
    }

    GetEntityLayers() {
        return this._entities;
    }
}