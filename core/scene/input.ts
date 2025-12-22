import { Vector2 } from "../../utils/vector2.js";

export class Input {
    mouseOrigin: Vector2;
    //worldOrigin: Vector2;

    isMouseDown = false;
    isMouseDownLeft = false;
    isMouseDownRight = false;
    justWheelUp = false;
    justWheelDown = false;
    keys = new Map<string, boolean>();
    
    constructor(private canvas: HTMLCanvasElement) {
        this.mouseOrigin = {x: this.canvas.width / 2, y: this.canvas.height / 2};

        console.log(this);
    }

    addEventListeners() {
        this.canvas.addEventListener("mousemove", (event: PointerEvent) => this.#onMouseMove(event));
        this.canvas.addEventListener("mousedown", (event: PointerEvent) => this.#onMouseDown(event));
        this.canvas.addEventListener("mouseup", (event: PointerEvent) => this.#onMouseUp(event));
        document.addEventListener("wheel", (event: WheelEvent) => this.#onMouseWheel(event));
        document.addEventListener("keydown", (event: KeyboardEvent) => this.#onKeyDown(event));
        document.addEventListener("keyup", (event: KeyboardEvent) => this.#onKeyUp(event));
        this.canvas.addEventListener("contextmenu", (event: PointerEvent) => this.#onContextMenu(event));
    }

    #onMouseMove(e: PointerEvent): void {
        const canvasBoundingClientRect: DOMRect = this.canvas.getBoundingClientRect();

        this.mouseOrigin = {
            x: Math.floor(e.x - canvasBoundingClientRect.x + 1),
            y: e.y - Math.floor(canvasBoundingClientRect.y)
        };

        // this.worldOrigin = {x: this.screenOrigin.x + this.scene.camera.origin.x, y: this.screenOrigin.y + this.scene.camera.origin.y};
    }

    #onMouseDown(e: PointerEvent) {
        this.isMouseDown = true;
        if (e.button === 0) {
            this.isMouseDownLeft = true;
        }
        if (e.button === 2) {
            this.isMouseDownRight = true;
        }
    }

    #onMouseUp(e: PointerEvent) {
        this.isMouseDown = false;
        this.isMouseDownLeft = false;
        this.isMouseDownRight = false;
    }

    #onMouseWheel(e: WheelEvent) {
        if (e.deltaY < 0) {
            this.justWheelUp = true;
        }
        else {
            this.justWheelDown = true;
        }
    }

    #onKeyDown(e: KeyboardEvent) {
        this.keys.set(e.code, true);
    }

    #onKeyUp(e: KeyboardEvent) {
        this.keys.set(e.code, false);
    }

    #onContextMenu(e: PointerEvent) {
        e.preventDefault();
    }
}