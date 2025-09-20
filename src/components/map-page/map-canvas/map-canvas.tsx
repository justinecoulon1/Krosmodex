import { MouseEvent, useEffect, useRef } from 'react';
import mapData from '../../../utils/sub_areas.json';
import styles from './map-canvas.module.css';
import { drawSubArea, getCellSubArea, getMapCoordinates, SubArea } from './map-canvas.utils';
import { CELL_SIZE, GREYED_AREAS, MAP_HEIGHT, MAP_WIDTH, MIN_X, MIN_Y } from './map-canvas-constants';
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { RotateCcw } from 'lucide-react';

export default function MapGrid({
    onAreaSelected,
    onAreaHovered,
}: {
    onAreaSelected: (newSelectedArea: SubArea | null) => void;
    onAreaHovered: (newHoveredArea: SubArea | null) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
        const mapCoordinates = getMapCoordinates(e);
        const clickedArea = getCellSubArea(mapCoordinates);

        onAreaSelected(clickedArea || null);
    };

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        const mapCoordinates = getMapCoordinates(e);
        const hoveredArea = getCellSubArea(mapCoordinates);
        onAreaHovered(hoveredArea || null);

        if (canvasRef.current) {
            if (hoveredArea && !GREYED_AREAS.includes(hoveredArea.subAreaId)) {
                canvasRef.current.style.cursor = 'pointer';
            } else {
                canvasRef.current.style.cursor = 'default';
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        canvas.width = MAP_WIDTH;
        canvas.height = MAP_HEIGHT;
        context.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

        mapData.forEach((subArea) => {
            drawSubArea(context, subArea, MIN_X, MIN_Y);
        });
    }, [mapData, CELL_SIZE]);

    return (
        <div style={{ overflow: 'hidden' }}>
            <TransformWrapper
                wheel={{ disabled: true }}
                pinch={{ disabled: true }}
                doubleClick={{ disabled: true }}
                limitToBounds={false}
                centerOnInit={true}
            >
                <CenterButton />
                <TransformComponent>
                    <canvas
                        className={styles.canvas}
                        width={MAP_WIDTH}
                        height={MAP_HEIGHT}
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        onMouseMove={handleMouseMove}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

function CenterButton() {
    const { resetTransform } = useControls();

    return (
        <div className={styles.centerButtonContainer}>
            <button onClick={() => resetTransform()}>
                <RotateCcw />
            </button>
        </div>
    );
}
