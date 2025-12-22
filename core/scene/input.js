export class Input {
    canvas;
    mouseOrigin;
    //worldOrigin: Vector2;
    isMouseDown = false;
    isMouseDownLeft = false;
    isMouseDownRight = false;
    justWheelUp = false;
    justWheelDown = false;
    keys = new Map();
    constructor(canvas) {
        this.canvas = canvas;
        this.mouseOrigin = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        console.log(this);
    }
    addEventListeners() {
        this.canvas.addEventListener("mousemove", (event) => this.#onMouseMove(event));
        this.canvas.addEventListener("mousedown", (event) => this.#onMouseDown(event));
        this.canvas.addEventListener("mouseup", (event) => this.#onMouseUp(event));
        document.addEventListener("wheel", (event) => this.#onMouseWheel(event));
        document.addEventListener("keydown", (event) => this.#onKeyDown(event));
        document.addEventListener("keyup", (event) => this.#onKeyUp(event));
        this.canvas.addEventListener("contextmenu", (event) => this.#onContextMenu(event));
    }
    #onMouseMove(e) {
        const canvasBoundingClientRect = this.canvas.getBoundingClientRect();
        this.mouseOrigin = {
            x: Math.floor(e.x - canvasBoundingClientRect.x + 1),
            y: e.y - Math.floor(canvasBoundingClientRect.y)
        };
        // this.worldOrigin = {x: this.screenOrigin.x + this.scene.camera.origin.x, y: this.screenOrigin.y + this.scene.camera.origin.y};
    }
    #onMouseDown(e) {
        this.isMouseDown = true;
        if (e.button === 0) {
            this.isMouseDownLeft = true;
        }
        if (e.button === 2) {
            this.isMouseDownRight = true;
        }
    }
    #onMouseUp(e) {
        this.isMouseDown = false;
        this.isMouseDownLeft = false;
        this.isMouseDownRight = false;
    }
    #onMouseWheel(e) {
        if (e.deltaY < 0) {
            this.justWheelUp = true;
        }
        else {
            this.justWheelDown = true;
        }
    }
    #onKeyDown(e) {
        this.keys.set(e.code, true);
    }
    #onKeyUp(e) {
        this.keys.set(e.code, false);
    }
    #onContextMenu(e) {
        e.preventDefault();
    }
}
