import { distanceEllipseVector2, distanceVector2, Vector2 } from "../../utils/vector2.js";
import { Input } from "./input.js";
import { Scene } from "./scene.js";
import { Tile } from "./tile.js";

export class Grid {
    tiles: Tile[] = [];
    hoveredTile: Tile;
    selectedTile: Tile;
    tileSize = 32;
    tileScale: Vector2 = {x: 2, y: 1};

    constructor(public scene: Scene, public width: number = 5, public height: number = 5) {
        // Tiles
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.tiles.push(new Tile({x: x, y: y}, "green"));
            }
        }

        console.log(this.tiles);
    }

    updateHoveredTile(input: Input, scene: Scene) {
        let closestTile: Tile;

        let lowestDistance = this.tileSize * Math.max(this.tileScale.x, this.tileScale.y) + 1; // + 1 to avoid edge cases
        for (const tile of this.tiles) {
            // const distance = distanceVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin); // Simple
            const distance = distanceEllipseVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin, 1, 4); // Experimental (scale2 x4)
            if (distance < lowestDistance) {
                lowestDistance = distance; 
                closestTile = tile;
            }
        }
        this.hoveredTile = closestTile;
    }  
}