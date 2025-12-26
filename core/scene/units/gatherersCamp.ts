import { Economy } from "../economy.js";
import { Structure } from "./structure.js";

export class GatherersCamp extends Structure {
    displayName = "Gatherer's Camp";

    produce(economy: Economy): void {
        economy.resources['Food'].delta += 2;
    }
}