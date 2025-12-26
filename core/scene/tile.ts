import { Vector2 } from "../../utils/vector2";
import { BIOMES } from "./biomes";
import { Scene } from "./scene";
import { Structure } from "./units/structure.js";

export class Tile {
    structure: Structure;

    constructor(public origin: Vector2, public biome: keyof typeof BIOMES) {
    }

    getOriginAsIsometric(): Vector2 {
        return {
            x: this.origin.x - this.origin.y,
            y: this.origin.x + this.origin.y,
        }
    }
    getOriginAsIsometricScaled(scene: Scene): Vector2 {
        const isoOrigin = this.getOriginAsIsometric();
        return {
            x: isoOrigin.x * scene.grid.tileScale.x * scene.grid.tileSize,
            y: isoOrigin.y * scene.grid.tileScale.y * scene.grid.tileSize,
        }
    }

    getOriginAsIsometricScaledAndOffsetByCamera(scene: Scene): Vector2 {
        const isoOriginScaled = this.getOriginAsIsometricScaled(scene);
        return {
            x: isoOriginScaled.x + scene.camera.origin.x,
            y: isoOriginScaled.y + scene.camera.origin.y,
        }
    }
}