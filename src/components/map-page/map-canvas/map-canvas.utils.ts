import {
    CELL_SIZE,
    GREYED_AREAS,
    MAP_BORDER_COLOR,
    MAP_BORDER_WIDTH,
    MAP_COLOR,
    MAP_GREYED_AREAS_COLOR,
    MIN_X,
    MIN_Y,
    UNDERGROUND_AREAS,
} from './map-canvas-constants';
import mapData from '../../../utils/sub_areas.json';
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

export function getCellSubArea(searchedCoordinates: Coordinates) {
    return mapData.find((area) =>
        area.subAreaCoordinates.some((coord) => coord.x === searchedCoordinates.x && coord.y === searchedCoordinates.y),
    );
}

export function drawSubArea(context: CanvasRenderingContext2D, subArea: SubArea, minX: number, minY: number) {
    const subAreaCells = new Set(subArea.subAreaCoordinates.map((coord) => `${coord.x},${coord.y}`));

    subArea.subAreaCoordinates.forEach((cell) => {
        const currentCellCoordinates = { x: cell.x, y: cell.y };

        const cellPositionX = (currentCellCoordinates.x - minX) * CELL_SIZE;
        const cellPositionY = (currentCellCoordinates.y - minY) * CELL_SIZE;

        if (!UNDERGROUND_AREAS.includes(subArea.subAreaId)) {
            if (GREYED_AREAS.includes(subArea.subAreaId)) {
                context.fillStyle = MAP_GREYED_AREAS_COLOR;
            } else {
                context.fillStyle = MAP_COLOR;
            }
            context.fillRect(cellPositionX, cellPositionY, CELL_SIZE, CELL_SIZE);
            context.fillStyle = MAP_BORDER_COLOR;
            drawBorder(context, subAreaCells, currentCellCoordinates, cellPositionX, cellPositionY);
        }
    });
}

function drawBorder(
    context: CanvasRenderingContext2D,
    subAreaCells: Set<string>,
    currentCellCoordinates: Coordinates,
    cellPositionX: number,
    cellPositionY: number,
) {
    if (!subAreaCells.has(`${currentCellCoordinates.x - 1},${currentCellCoordinates.y}`)) {
        drawStroke(context, { x: cellPositionX, y: cellPositionY + CELL_SIZE }, { x: cellPositionX, y: cellPositionY });
    }

    if (!subAreaCells.has(`${currentCellCoordinates.x + 1},${currentCellCoordinates.y}`)) {
        drawStroke(
            context,
            { x: cellPositionX + CELL_SIZE, y: cellPositionY },
            { x: cellPositionX + CELL_SIZE, y: cellPositionY + CELL_SIZE },
        );
    }

    if (!subAreaCells.has(`${currentCellCoordinates.x},${currentCellCoordinates.y - 1}`)) {
        drawStroke(context, { x: cellPositionX, y: cellPositionY }, { x: cellPositionX + CELL_SIZE, y: cellPositionY });
    }

    if (!subAreaCells.has(`${currentCellCoordinates.x},${currentCellCoordinates.y + 1}`)) {
        drawStroke(
            context,
            { x: cellPositionX, y: cellPositionY + CELL_SIZE },
            { x: cellPositionX + CELL_SIZE, y: cellPositionY + CELL_SIZE },
        );
    }
}

function drawStroke(context: CanvasRenderingContext2D, start: Coordinates, end: Coordinates) {
    context.lineWidth = MAP_BORDER_WIDTH;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}
