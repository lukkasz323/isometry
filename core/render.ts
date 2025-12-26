import { degreesToRadians } from "../utils/utils.js";
import { Vector2 } from "../utils/vector2.js";
import { FONT } from "./constants.js";
import { BIOMES } from "./scene/biomes.js";
import { Economy } from "./scene/economy.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { Tile } from "./scene/tile.js";

export function renderGame(scene: Scene, input: Input, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    renderBackground(ctx, canvas);
    // renderDebugGrid(ctx);
    renderGrid(ctx, scene);
    renderHud(ctx, scene);
    renderDebug(ctx, scene, input);
}

function renderDebug(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    ctx.font = `16px ${FONT}`;
    // Mouse coordinates
    ctx.fillStyle = "black";
    ctx.fillText(input.mouseOrigin.x.toString(), 20, 20);
    ctx.fillText(input.mouseOrigin.y.toString(), 20, 40);

    // Hovered tile coordinates
    const tile = scene.grid.hoveredTile;
    if (tile) {
        ctx.fillStyle = "blue";
        ctx.fillText(tile.origin.x.toString(), 80, 20);
        ctx.fillText(tile.origin.y.toString(), 80, 40);
    }

    // Projected tile origins
    // for (const tile of scene.grid.tiles) {
    //     ctx.fillStyle = "red";
    //     const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
    //     ctx.fillRect(origin.x, origin.y, 4, 4);

    //     // Hovered tile ellipse radius visualization
    //     // const r = distanceEllipseVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin, 1, 1);
    //     // if (r < scene.grid.tileSize * 2) {
    //     //     renderShape(ctx, tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), r, 16, "green");
    //     // }
    // }

    // Hovered tile ellipse radius visualization
    // const tile = scene.grid.hoveredTile;
    // if (tile) {
    //     renderShape(ctx, tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), distanceEllipseVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin, 1, 1), 16, "green");
    // }
}

function renderDebugGrid(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 0.1;
    const tileSize = 64;
    const tileWidth = tileSize;
    const tileHeight = tileSize;
    for (let y = 0; y < ctx.canvas.height / tileSize; y++) {
        for (let x = 0; x < ctx.canvas.width / tileSize; x++) {
            ctx.strokeRect(x * tileWidth,y * tileHeight, tileWidth, tileHeight);
        }
    }
}

function renderBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderGrid(ctx: CanvasRenderingContext2D, scene: Scene) {
    // let strokeColor = "black";
    // for (const tile of scene.grid.tiles) {
    //     if (tile !== scene.grid.selectedTile || tile !== scene.grid.hoveredTile) {
    //         renderGridTile(ctx, scene, tile, strokeColor, BIOMES[tile.biome].color);
    //     }
    // }
    // // This is placed after the for loop to render last.
    // if (scene.grid.selectedTile) {
    //     strokeColor = "cyan";
    //     renderGridTile(ctx, scene, scene.grid.selectedTile, strokeColor, BIOMES[scene.grid.selectedTile.biome].color);
    // }
    // if (scene.grid.hoveredTile && scene.grid.hoveredTile !== scene.grid.selectedTile) {
    //     strokeColor = "blue";
    //     renderGridTile(ctx, scene, scene.grid.hoveredTile, strokeColor, BIOMES[scene.grid.hoveredTile.biome].color);
    // }
    let strokeColor = "black";
    for (const tile of scene.grid.tiles) {
        renderGridTile(ctx, scene, tile, strokeColor, BIOMES[tile.biome].color);
        // Structure
        if (tile.structure) {
            const fontSize = scene.grid.tileSize * 1.5;
            ctx.font = `${fontSize}px ${FONT}`;
            ctx.fillStyle = "black";
            const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
            ctx.fillText(tile.structure.displayName.charAt(0), origin.x - fontSize / 3, origin.y + fontSize / 3 );
        }
    }
    // This is placed after the for loop to render last.
    if (scene.grid.hoveredTile) {
        strokeColor = "blue";
        renderGridTile(ctx, scene, scene.grid.hoveredTile, strokeColor, null, 2);
    }
    if (scene.grid.selectedTile) {
        strokeColor = "cyan";   
        renderGridTile(ctx, scene, scene.grid.selectedTile, strokeColor, null, 2);
    }
    if (scene.grid.actionModeTile && scene.grid.actionModeTile.structure.actionRadius > 0) {
        strokeColor = "orange";
        const origin = scene.grid.actionModeTile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
        const scale = scene.grid.actionModeTile.structure.actionRadius * 2 + 1; 
        renderShape(ctx, origin, scene.grid.tileSize, 4, strokeColor, null, 2, scene.grid.tileScale.x * scale, scene.grid.tileScale.y * scale, 90);
    }
    
}

function renderGridTile(ctx: CanvasRenderingContext2D, scene: Scene, tile: Tile, strokeColor: string, fillColor: string, lineWidth: number = 1) {
    const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
        renderShape(ctx, origin, scene.grid.tileSize, 4, strokeColor, fillColor, lineWidth, scene.grid.tileScale.x, scene.grid.tileScale.y, 90);
}

function renderShape(ctx: CanvasRenderingContext2D, origin: Vector2, radius: number, vertices: number, strokeColor: string = null, fillColor: string = null, lineWidth: number = 2, scaleX: number = 1, scaleY: number = 1, rotation: number = 0) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(
            origin.x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, 
            origin.y + radius * Math.sin((i * angle) + rotationRadians) * scaleY
        );
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

function renderRect(ctx: CanvasRenderingContext2D, fillColor: string = null, strokeColor: string = null, x: number = 32, y: number = 32, w: number = 32, h: number = 32, lineWidth: number = 2) {
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w, h);
    }
    if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, w, h);
    }
}

function renderHud(ctx: CanvasRenderingContext2D, scene: Scene) {
    // Tooltip
    let tile;
    if (scene.grid.selectedTile) {
        tile = scene.grid.selectedTile;
    }
    else if (scene.grid.hoveredTile) {
        tile = scene.grid.hoveredTile;
    }
    if (tile) {
        // Background
        const totalHeight = 64;
        const margin = 1;
        renderRect(ctx, "gray", "black", margin, ctx.canvas.height - totalHeight, ctx.canvas.width - (margin * 2), totalHeight - margin, 2);
        // Info
        ctx.lineWidth = 2;
        renderRect(ctx, BIOMES[tile.biome].color, "black", margin + (totalHeight / 8), ctx.canvas.height - (totalHeight / 1.09), totalHeight / 1.2, totalHeight / 1.2);
        ctx.fillStyle = "black";
        ctx.font = `20px ${FONT}`;
        ctx.fillText(tile.biome, margin + 80, ctx.canvas.height - (totalHeight / 2));
        if (tile.structure) {
            ctx.fillText(tile.structure.displayName, margin + 160, ctx.canvas.height - (totalHeight / 2));
        }
    }

    // Economy
    const economy: Economy = scene.players[0].economy;

    ctx.font = `16px ${FONT}`;
    ctx.fillStyle = "black";
    ctx.fillText(`Settlers: ${Math.max(0, economy.resources['Settlers'].current)} (${economy.resources['Settlers'].current - economy.resources['Workers'].current} idle)`, 150, 32);
    ctx.fillText(`Food: ${economy.resources['Food'].current} / ${economy.resources['Food'].max}`, 350, 32);
    ctx.fillText(`Wood: ${economy.resources['Wood'].current} / ${economy.resources['Wood'].max}`, 500, 32);
    ctx.fillText(`Stone: ${economy.resources['Stone'].current} / ${economy.resources['Stone'].max}`, 650, 32);
}