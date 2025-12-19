export function busy(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
export function rngBetweenInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export const DIAGONAL = 0.7071067811865475;
