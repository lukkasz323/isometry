import { Economy } from "../economy.js";
import { Structure } from "./structure.js";

export class Monolith extends Structure {
    displayName = "Monolith";
    actionRadius: number = 2;  

    produce(economy: Economy): void {   
    }
}