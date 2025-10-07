import {
    CELL_SIZE,
    EXPLORED_MAP_COLOR_B,
    EXPLORED_MAP_COLOR_G,
    EXPLORED_MAP_COLOR_R,
    GREYED_AREAS,
    MAP_BORDER_COLOR,
    MAP_BORDER_WIDTH,
    MAP_COLOR_B,
    MAP_COLOR_G,
    MAP_COLOR_R,
    MAP_GREYED_AREAS_COLOR,
    MAX_EXPLORATION_TIME,
    MIN_X,
    MIN_Y,
} from './map-canvas-constants';
import { MouseEvent } from 'react';

export type Coordinates = { x: number; y: number };
export type SubArea = {
    subAreaId: number;
    subAreaName: string;
    subAreaCoordinates: Coordinates[];
};

export function getMapCoordinates(e: MouseEvent<HTMLCanvasElement>) {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);

    return { x: cellX + MIN_X, y: cellY + MIN_Y };
}

export function getCellSubArea(displayedAreas: SubArea[], searchedCoordinates: Coordinates) {
    return displayedAreas.find((area) =>
        area.subAreaCoordinates.some((coord) => coord.x === searchedCoordinates.x && coord.y === searchedCoordinates.y),
    );
}

export function drawSubArea(
    context: CanvasRenderingContext2D,
    subArea: SubArea,
    subAreaLastExplorationTimeById: Map<number, number>,
    currentTime: number,
) {
    const subAreaCells = new Set(subArea.subAreaCoordinates.map((coord) => `${coord.x},${coord.y}`));
    const lastExplorationTime = subAreaLastExplorationTimeById.get(subArea.subAreaId) ?? 0;
    const timeSinceLastExploration = currentTime - lastExplorationTime;

    subArea.subAreaCoordinates.forEach((cell) => {
        const currentCellCoordinates = { x: cell.x, y: cell.y };

        const cellPositionX = (currentCellCoordinates.x - MIN_X) * CELL_SIZE;
        const cellPositionY = (currentCellCoordinates.y - MIN_Y) * CELL_SIZE;

        if (GREYED_AREAS.includes(subArea.subAreaId)) {
            context.fillStyle = MAP_GREYED_AREAS_COLOR;
        } else {
            const ratio = Math.max(0, Math.min(MAX_EXPLORATION_TIME, timeSinceLastExploration)) / MAX_EXPLORATION_TIME;
            const r = EXPLORED_MAP_COLOR_R + (MAP_COLOR_R - EXPLORED_MAP_COLOR_R) * ratio;
            const g = EXPLORED_MAP_COLOR_G + (MAP_COLOR_G - EXPLORED_MAP_COLOR_G) * ratio;
            const b = EXPLORED_MAP_COLOR_B + (MAP_COLOR_B - EXPLORED_MAP_COLOR_B) * ratio;
            context.fillStyle = `rgb(${r},${g},${b})`;
        }
        context.fillRect(cellPositionX, cellPositionY, CELL_SIZE, CELL_SIZE);
        context.fillStyle = MAP_BORDER_COLOR;
        drawBorder(context, subAreaCells, currentCellCoordinates, cellPositionX, cellPositionY);
    });
}

function drawBorder(
    context: CanvasRenderingContext2D,
    subAreaCells: Set<string>,
    currentCellCoordinates: Coordinates,
    cellPositionX: number,
    cellPositionY: number,
) {
    if (!hasCoordinates(subAreaCells, currentCellCoordinates.x - 1, currentCellCoordinates.y)) {
        drawStroke(context, { x: cellPositionX, y: cellPositionY + CELL_SIZE }, { x: cellPositionX, y: cellPositionY });
    }

    if (!hasCoordinates(subAreaCells, currentCellCoordinates.x + 1, currentCellCoordinates.y)) {
        drawStroke(
            context,
            { x: cellPositionX + CELL_SIZE, y: cellPositionY },
            { x: cellPositionX + CELL_SIZE, y: cellPositionY + CELL_SIZE },
        );
    }

    if (!hasCoordinates(subAreaCells, currentCellCoordinates.x, currentCellCoordinates.y - 1)) {
        drawStroke(context, { x: cellPositionX, y: cellPositionY }, { x: cellPositionX + CELL_SIZE, y: cellPositionY });
    }

    if (!hasCoordinates(subAreaCells, currentCellCoordinates.x, currentCellCoordinates.y + 1)) {
        drawStroke(
            context,
            { x: cellPositionX, y: cellPositionY + CELL_SIZE },
            { x: cellPositionX + CELL_SIZE, y: cellPositionY + CELL_SIZE },
        );
    }
}

function hasCoordinates(subAreaCells: Set<string>, x: number, y: number) {
    return subAreaCells.has(`${x},${y}`);
}

function drawStroke(context: CanvasRenderingContext2D, start: Coordinates, end: Coordinates) {
    context.lineWidth = MAP_BORDER_WIDTH;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}
