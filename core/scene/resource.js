import { clamp } from "../../utils/utils.js";
export class Resource {
    type;
    _current;
    max;
    delta;
    constructor(type, _current = 0, max = 10, delta = 0) {
        this.type = type;
        this._current = _current;
        this.max = max;
        this.delta = delta;
    }
    get current() {
        return this._current;
    }
    ;
    set current(v) {
        // if (v > 10) debugger;
        this._current = clamp(v, 0, this.max);
    }
}
