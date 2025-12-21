import { rngBetweenInclusive } from "../../utils/utils.js";
export const Direction8 = [
    'Up',
    'UpLeft',
    'UpRight',
    'Down',
    'DownLeft',
    'DownRight',
    'Left',
    'Right'
];
export const Direction8_to_Vector2 = {
    'Up': { x: 0, y: -1 },
    'UpLeft': { x: -1, y: -1 },
    'UpRight': { x: 1, y: -1 },
    'Down': { x: 0, y: 1 },
    'DownLeft': { x: -1, y: 1 },
    'DownRight': { x: 1, y: 1 },
    'Left': { x: -1, y: 0 },
    'Right': { x: 1, y: 0 },
};
export function getRandomDirection8() {
    const randomKey = Direction8[rngBetweenInclusive(0, Direction8.length - 1)];
    return Direction8_to_Vector2[randomKey];
}
