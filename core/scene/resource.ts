import { clamp } from "../../utils/utils.js";
import { RESOURCES } from "./resources.js";

export class Resource {
    constructor(
        public type: keyof typeof RESOURCES, 
        private _current = 0, 
        public max: number = 10, 
        public delta: number = 0)
        {
    }

    get current() { 
        return this._current; 
    };

    set current(v) {
        // if (v > 10) debugger;
        this._current = clamp(v, 0, this.max);
    }
}