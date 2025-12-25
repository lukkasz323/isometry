import { FPSCounter } from "../../utils/fpsCounter.js";
import { Camera } from "./camera.js";
import { Grid } from "./grid.js";
import { Player } from "./player.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    camera: Camera;
    players: Player[] = [new Player()];
    grid = new Grid(this);

    constructor(private canvas: HTMLCanvasElement) {
        this.camera = new Camera(canvas);

        console.log(this); // Debug
    }
}