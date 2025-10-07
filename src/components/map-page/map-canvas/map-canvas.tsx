import { MouseEvent, useEffect, useRef } from 'react';
import mapData from '../../../utils/sub_areas.json';
import styles from './map-canvas.module.css';
import { drawSubArea, getCellSubArea, getMapCoordinates, SubArea } from './map-canvas.utils';
import { CELL_SIZE, GREYED_AREAS, MAP_HEIGHT, MAP_WIDTH, REDRAW_PERIOD } from './map-canvas-constants';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import CenterButton from './center-button/center-button';
import { useExplorationContext } from '../../../contexts/exploration-context';

export default function MapGrid({
    onAreaSelected,
    onAreaHovered,
    onAreaRightClicked,
}: {
    onAreaSelected: (newSelectedArea: SubArea | null) => void;
    onAreaHovered: (newHoveredArea: SubArea | null) => void;
    onAreaRightClicked: (newExploredArea: SubArea) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { subAreaLastExplorationTimeById, displayedAreas } = useExplorationContext();

    const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
        const mapCoordinates = getMapCoordinates(e);
        const clickedArea = getCellSubArea(displayedAreas, mapCoordinates);

        onAreaSelected(clickedArea || null);
    };

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        const mapCoordinates = getMapCoordinates(e);
        const hoveredArea = getCellSubArea(displayedAreas, mapCoordinates);
        onAreaHovered(hoveredArea || null);

        if (canvasRef.current) {
            if (hoveredArea && !GREYED_AREAS.includes(hoveredArea.subAreaId)) {
                canvasRef.current.style.cursor = 'pointer';
            } else {
                canvasRef.current.style.cursor = 'default';
            }
        }
    };

    const handleRightClick = (e: MouseEvent<HTMLCanvasElement>) => {
        const mapCoordinates = getMapCoordinates(e);
        const clickedArea = getCellSubArea(displayedAreas, mapCoordinates);
        if (!clickedArea || GREYED_AREAS.includes(clickedArea.subAreaId)) return;
        onAreaRightClicked(clickedArea);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        canvas.width = MAP_WIDTH;
        canvas.height = MAP_HEIGHT;
        context.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

        const drawSubAreas = () => {
            const currentTime = Date.now();
            displayedAreas.forEach((subArea) => {
                drawSubArea(context, subArea, subAreaLastExplorationTimeById, currentTime);
            });
        };

        drawSubAreas();
        const drawInterval = setInterval(() => {
            drawSubAreas();
        }, REDRAW_PERIOD);

        return () => {
            clearInterval(drawInterval);
        };
    }, [mapData, subAreaLastExplorationTimeById, CELL_SIZE]);

    return (
        <div className={styles.mapGridContainer}>
            <TransformWrapper
                wheel={{ disabled: true }}
                pinch={{ disabled: true }}
                doubleClick={{ disabled: true }}
                panning={{ velocityDisabled: true }}
                centerOnInit={false}
                limitToBounds={false}
            >
                <CenterButton />
                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                    <canvas
                        className={styles.canvas}
                        width={MAP_WIDTH}
                        height={MAP_HEIGHT}
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        onMouseMove={handleMouseMove}
                        onAuxClick={handleRightClick}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}
