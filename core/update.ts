import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";

export function updateGame(scene: Scene, input: Input, canvas: HTMLCanvasElement, deltaTime: number) {
    if (input.showFPS) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }

    // Move camera
    if (input.mouseOrigin.x < 32) {
        scene.camera.origin.x += scene.camera.speed;
    }
    if (input.mouseOrigin.y < 32) {
        scene.camera.origin.y += scene.camera.speed;
    }
    if (input.mouseOrigin.x > canvas.width - 32) {
        scene.camera.origin.x -= scene.camera.speed;
    }
    if (input.mouseOrigin.y > canvas.height - 32) {
        scene.camera.origin.y -= scene.camera.speed;
    }

    scene.ticks++;
}