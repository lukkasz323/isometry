import { rngBetweenInclusive } from "../../utils/utils.js";
export const Direction4 = [
    'Up',
    'Down',
    'Left',
    'Right',
];
export const Direction8 = [
    'Up',
    'Down',
    'Left',
    'Right',
    'UpLeft',
    'DownRight',
    'DownLeft',
    'UpRight',
];
export const Direction4_to_Vector2 = {
    'Up': { x: 0, y: -1 },
    'Down': { x: 0, y: 1 },
    'Left': { x: -1, y: 0 },
    'Right': { x: 1, y: 0 },
};
export const Direction8_to_Vector2 = {
    'Up': { x: 0, y: -1 },
    'Down': { x: 0, y: 1 },
    'Left': { x: -1, y: 0 },
    'Right': { x: 1, y: 0 },
    'UpLeft': { x: -1, y: -1 },
    'DownRight': { x: 1, y: 1 },
    'DownLeft': { x: -1, y: 1 },
    'UpRight': { x: 1, y: -1 },
};
export function getRandomDirection4() {
    const randomKey = Direction4[rngBetweenInclusive(0, Direction4.length - 1)];
    return Direction4_to_Vector2[randomKey];
}
export function getRandomDirection8() {
    const randomKey = Direction8[rngBetweenInclusive(0, Direction8.length - 1)];
    return Direction8_to_Vector2[randomKey];
}
