import { rngBetweenInclusive } from "../../utils/utils.js";
import { differenceVector2, distanceEllipseVector2 } from "../../utils/vector2.js";
import { Tile } from "./tile.js";
import { getRandomDirection4 } from "./direction.js";
import { Monolith } from "./units/monolith.js";
export class Grid {
    scene;
    width;
    height;
    tiles = [];
    hoveredTile;
    selectedTile;
    actionModeTile;
    tileSize = 8;
    tileScale = { x: 2, y: 1 };
    constructor(scene, width = 32, height = 32) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.generateWorld();
        this.spawnPlayers();
        console.log(this.tiles);
    }
    getTileAt(origin) {
        return this.tiles.find(tile => tile.origin.x === origin.x && tile.origin.y === origin.y);
    }
    getDistanceBetweenTiles(a, b) {
        return differenceVector2(a.origin, b.origin);
    }
    updateHoveredTile(input, scene) {
        let closestTile;
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
    generateWorld() {
        // Step 1 - All Ocean
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.tiles.push(new Tile({ x: x, y: y }, "Ocean"));
            }
        }
        // Step 2 - Land
        // const start: Vector2 = {x: rngBetweenInclusive(0, this.width - 1), y: rngBetweenInclusive(0, this.height - 1)};
        const start = { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) };
        for (let j = 0; j < 4; j++) {
            let head = { ...start };
            this.getTileAt(start).biome = "Plains";
            for (let i = 0; i < this.width * this.height / 2; i++) {
                const offset = getRandomDirection4();
                head.x += offset.x;
                head.y += offset.y;
                const tile = this.getTileAt(head);
                if (tile) {
                    tile.biome = "Plains";
                }
                else {
                    head = { ...start };
                }
            }
        }
    }
    spawnPlayers() {
        // Find available spot
        let spawnTile;
        while (!spawnTile) {
            spawnTile = this.tiles.find(tile => tile.biome !== "Ocean" && tile.origin.x === rngBetweenInclusive(0, this.width - 1) && tile.origin.y === rngBetweenInclusive(0, this.height - 1));
        }
        // Spawn
        spawnTile.structure = new Monolith();
    }
}
