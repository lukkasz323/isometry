import { rngBetweenInclusive } from "../../utils/utils.js";
import { Vector2 } from "../../utils/vector2.js";

export const Direction4 = [
    'Up',
    'Down',
    'Left',
    'Right',
] as const; 
export type Direction4Type = typeof Direction4[number];

export const Direction8 = [
    'Up',
    'Down',
    'Left',
    'Right',
    'UpLeft',
    'DownRight',
    'DownLeft',
    'UpRight',  
] as const;
export type Direction8Type = typeof Direction8[number];

export const Direction4_to_Vector2: Record<Direction4Type, Vector2> = {
    'Up': {x: 0, y: -1},
    'Down': {x: 0, y: 1},
    'Left': {x: -1, y: 0},
    'Right': {x: 1, y: 0},
};

export const Direction8_to_Vector2: Record<Direction8Type, Vector2> = {
    'Up': {x: 0, y: -1},
    'Down': {x: 0, y: 1},
    'Left': {x: -1, y: 0},
    'Right': {x: 1, y: 0},
    'UpLeft': {x: -1, y: -1},
    'DownRight': {x: 1, y: 1},
    'DownLeft': {x: -1, y: 1},
    'UpRight': {x: 1, y: -1},
};

export function getRandomDirection4(): Vector2 {
    const randomKey: Direction4Type = Direction4[rngBetweenInclusive(0, Direction4.length - 1)];
    return Direction4_to_Vector2[randomKey];
}


export function getRandomDirection8(): Vector2 {
    const randomKey: Direction8Type = Direction8[rngBetweenInclusive(0, Direction8.length - 1)];
    return Direction8_to_Vector2[randomKey];
}
