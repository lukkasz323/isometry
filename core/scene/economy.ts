import { Resource } from "./resource.js";
import { RESOURCES } from "./resources.js";
import { Scene } from "./scene";

export class Economy {
    resources: Record<keyof typeof RESOURCES, Resource> = {
            "Settlers": new Resource("Settlers", 5),
            "Workers": new Resource("Workers"),
            "Food": new Resource("Food", 10),
            "Wood": new Resource("Wood"),
            "Stone": new Resource("Stone"),
    };

    process(scene: Scene): void {
        // Delta
        this.resources['Settlers'].delta = -1;
        this.resources['Workers'].delta = 0;
        this.resources['Food'].delta = 0;
        this.resources['Wood'].delta = 0;
        this.resources['Stone'].delta = 0;

        // --- Produce
        for (const tile of scene.grid.tiles) {
            if (tile.structure) {
                tile.structure.produce(this);
            }
        }

        // --- Consume
        for (let i = 0; i < this.resources['Settlers'].current; i++) {
            this.resources['Food'].delta -= 1;
        }

        // Settlers
        if (this.resources['Food'].current > 0) {
            this.resources['Settlers'].delta += 2;
        }

        // Food
        this.resources['Settlers'].current += this.resources['Settlers'].delta;
        this.resources['Food'].current += this.resources['Food'].delta;
    }
}