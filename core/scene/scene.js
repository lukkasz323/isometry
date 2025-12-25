import { FPSCounter } from "../../utils/fpsCounter.js";
import { Camera } from "./camera.js";
import { Grid } from "./grid.js";
import { Player } from "./player.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    camera;
    players = [new Player()];
    grid = new Grid(this);
    constructor(canvas) {
        this.canvas = canvas;
        this.camera = new Camera(canvas);
        console.log(this); // Debug
    }
}
