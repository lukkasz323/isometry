import { Economy } from "../economy.js";
import { Unit } from "./unit.js";

export abstract class Structure extends Unit {
    upkeep = 0;

    abstract produce(economy: Economy): void;
}