import { GatherersCamp } from "./scene/structures/gatherersCamp.js";
export function updateGame(scene, input, canvas, deltaTime) {
    let loop = true;
    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // Move camera
    let padding = 16;
    if (!window.navigator.userAgentData.mobile) { // Temporary
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
        scene.grid.tileSize *= 2;
        console.log(scene.grid.tileSize);
    }
    if (input.justWheelDown) {
        scene.grid.tileSize /= 2;
        console.log(scene.grid.tileSize);
    }
    // Find hovered tile
    scene.grid.updateHoveredTile(input, scene);
    // Tile select
    if (input.isMouseDownLeft) {
        if (scene.grid.hoveredTile) {
            scene.grid.selectedTile = scene.grid.hoveredTile;
        }
        else {
            scene.grid.selectedTile = null;
        }
    }
    // Place structures
    // debugger;
    if (input.isMouseDownRight && scene.grid.hoveredTile && !scene.grid.hoveredTile.structure && scene.economy.resources['Workers'].current < scene.economy.resources['Settlers'].current) {
        scene.economy.resources['Workers'].current += 1;
        scene.grid.hoveredTile.structure = new GatherersCamp();
    }
    // Process
    if (scene.ticks % 30 === 0) {
        scene.economy.process(scene);
        // scene.economy.resources['']settlers.current += scene.economy.resources['']settlers.current / 2 |0;
    }
    if (scene.ticks % 60 === 0) {
    }
    // Game over
    if (scene.economy.resources['Settlers'].current < 0) {
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
