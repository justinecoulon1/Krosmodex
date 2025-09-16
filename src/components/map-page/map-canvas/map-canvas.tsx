import { useEffect, useRef } from 'react';
import mapData from '../../../utils/sub_areas.json';
import styles from './map-canvas.module.css';

const allCoords = mapData.flatMap((area) => area.subAreaCoordinates);

const minX = Math.min(...allCoords.map((coord) => coord.x));
const maxX = Math.max(...allCoords.map((coord) => coord.x));
const minY = Math.min(...allCoords.map((coord) => coord.y));
const maxY = Math.max(...allCoords.map((coord) => coord.y));

const cellSize = 10;

const mapWidth = (maxX - minX + 1) * cellSize;
const mapHeight = (maxY - minY + 1) * cellSize;

export default function MapGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = mapWidth;
        canvas.height = mapHeight;

        context.clearRect(0, 0, mapWidth, mapHeight);

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                const hasCell = allCoords.some((c) => c.x === x && c.y === y);

                context.fillStyle = hasCell ? '#918f87' : '#41444b';

                context.fillRect((x - minX) * cellSize, (y - minY) * cellSize, cellSize, cellSize);
            }
        }
    }, [mapData, cellSize]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}
