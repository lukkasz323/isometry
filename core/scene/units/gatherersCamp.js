import { Structure } from "./structure.js";
export class GatherersCamp extends Structure {
    displayName = "Gatherer's Camp";
    produce(economy) {
        economy.resources['Food'].delta += 2;
    }
}
