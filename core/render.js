import { degreesToRadians } from "../utils/utils.js";
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext("2d");
    renderBackground(ctx, canvas);
    renderDebugGrid(ctx);
    renderGrid(ctx, scene);
    renderDebug(ctx, scene, input);
}
function renderDebug(ctx, scene, input) {
    // Mouse coordinates
    ctx.fillStyle = "black";
    ctx.fillText(input.mouseOrigin.x.toString(), 32, 32);
    ctx.fillText(input.mouseOrigin.y.toString(), 32, 64);
    // Projected tile origin coordinates 
    // for (const tile of scene.grid.tiles) {
    //     ctx.fillStyle = "red";
    //     const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
    //     ctx.fillRect(origin.x, origin.y, 4, 4);
    // }
}
function renderDebugGrid(ctx) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 0.1;
    const tileSize = 64;
    const tileWidth = tileSize;
    const tileHeight = tileSize;
    for (let y = 0; y < ctx.canvas.height / tileSize; y++) {
        for (let x = 0; x < ctx.canvas.width / tileSize; x++) {
            ctx.strokeRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
}
function renderBackground(ctx, canvas) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderGridHexagonal(ctx, scene, canvas) {
    const gridOffset = 128;
    const canvasAvgSize = (canvas.width + canvas.height) / 2;
    const radius = canvasAvgSize / 20;
    for (const tile of scene.grid.tiles) {
        const offsetX = tile.origin.y % 2 === 1 ? radius : 0;
        const offsetY = tile.origin.y * -(radius / 2);
        renderShape(ctx, "red", "black", 2, gridOffset + (1 * tile.origin.x) * radius * 2 + offsetX, gridOffset + (1 * tile.origin.y) * radius * 2 + offsetY, radius, 6, 90, 1.15);
    }
}
function renderGrid(ctx, scene) {
    let strokeColor = "black";
    for (const tile of scene.grid.tiles) {
        if (tile !== scene.grid.hoveredTile) {
            renderGridTile(ctx, scene, tile, strokeColor);
        }
    }
    // Outside of the for loop to render last 
    if (scene.grid.hoveredTile) {
        strokeColor = "blue";
        renderGridTile(ctx, scene, scene.grid.hoveredTile, strokeColor);
    }
}
function renderGridTile(ctx, scene, tile, strokeColor) {
    const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
    renderShape(ctx, null, strokeColor, 2, origin.x, origin.y, 
    // scene.camera.origin.x*0 + (tile.origin.x * scene.grid.tileSize * scene.grid.tileScale.x - tile.origin.y * scene.grid.tileSize * scene.grid.tileScale.x),
    // scene.camera.origin.y*0 + (tile.origin.y * scene.grid.tileSize * scene.grid.tileScale.y + tile.origin.x * scene.grid.tileSize * scene.grid.tileScale.y), 
    scene.grid.tileSize, 4, 90, scene.grid.tileScale.x, scene.grid.tileScale.y);
}
function renderShape(ctx, fillColor, strokeColor, lineWidth, x, y, radius, vertices, rotation = 0, scaleX = 1, scaleY = 1) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, y + radius * Math.sin((i * angle) + rotationRadians) * scaleY);
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}
