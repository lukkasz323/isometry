import { Economy } from "../economy";

export abstract class Structure {
    abstract displayName: string;
    upkeep = 0;

    abstract produce(economy: Economy): void;
}