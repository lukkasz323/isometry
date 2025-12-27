import { Vector2 } from "../utils/vector2.js";
import { Grid } from "./scene/grid.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { GatherersCamp } from "./scene/units/gatherersCamp.js";
import { Monolith } from "./scene/units/monolith.js";

export function updateGame(scene: Scene, input: Input, canvas: HTMLCanvasElement, deltaTime: number): boolean {
    let loop = true;

    const grid: Grid = scene.grid;

    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }

    // Move camera
    let padding = 16;
    if (!(window.navigator as any).userAgentData.mobile) { // Temporary
        padding = 0;
    }
    if (input.keys.get("KeyA") || input.mouseOrigin.x < padding) {
        scene.camera.origin.x += scene.camera.speed;
    }
    if (input.keys.get("KeyW") || input.mouseOrigin.y < padding) {
        scene.camera.origin.y += scene.camera.speed;
    }
    if (input.keys.get("KeyD") || input.mouseOrigin.x > canvas.width - padding) {
        scene.camera.origin.x -= scene.camera.speed;
    }
    if (input.keys.get("KeyS") || input.mouseOrigin.y > canvas.height - padding) {
        scene.camera.origin.y -= scene.camera.speed;
    }

    // Zoom camera
    if (input.justWheelUp) {
        grid.tileSize *= 2;
        console.log(grid.tileSize);
    }       
    if (input.justWheelDown) {  
        grid.tileSize /= 2;
        console.log(grid.tileSize);
    }

    // Find hovered tile
    grid.updateHoveredTile(input, scene);

    // Tile select
    if (input.isMouseDownLeft) {
        if (grid.hoveredTile) {
            grid.selectedTile = grid.hoveredTile;
        } else {
            grid.selectedTile = null;
        }
    }

    // Right click
    if (input.isMouseDownRight) {
        if (grid.hoveredTile) {
            if (grid.hoveredTile.structure) {
                // Act with structures
                if (grid.hoveredTile.structure instanceof Monolith) {
                    grid.actionModeTile = grid.hoveredTile;
                }
            }
            else {
                // Nothing for now
            }
        }
        if (grid.actionModeTile) {
            // Try place structure
            // --- If structure not already placed here
            if (!grid.hoveredTile.structure) {
                // --- If within action radius
                const radius = grid.actionModeTile.structure.actionRadius;
                const distance: Vector2 = grid.getDistanceBetweenTiles(grid.actionModeTile, grid.hoveredTile);
                if (distance.x <= radius && distance.y <= radius &&distance.x >= -radius && distance.y >= -radius) {
                    // --- If enough idle workers
                    if (scene.players[0].economy.resources['Workers'].current < scene.players[0].economy.resources['Settlers'].current) {
                        scene.players[0].economy.resources['Workers'].current += 1;
                        grid.hoveredTile.structure = new GatherersCamp();
                    }
                }
            }
        }
    }

    

    // Process
    if (scene.ticks % 30 === 0) {
        scene.players[0].economy.process(scene);
    }
    if (scene.ticks % 60 === 0) {
    }

    // Game over
    if (scene.players[0].economy.resources['Settlers'].current < 0) {
        loop = false;
    }

    // Reset "just" inputs
    input.justWheelUp = false;
    input.justWheelDown = false;

    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}