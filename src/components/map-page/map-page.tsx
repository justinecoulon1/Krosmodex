import styles from './map-page.module.css';
import MapGrid from './map-canvas/map-canvas';
import { useState } from 'react';
import { SubArea } from './map-canvas/map-canvas.utils';
import SubAreaDetailsContainer from './sub-area-details/sub-area-details-container';

export default function MapPageContainer() {
    const [selectedArea, setSelectedArea] = useState<SubArea | null>();
    const [hoveredArea, setHoveredArea] = useState<SubArea | null>();

    const onAreaSelected = (newSelectedArea: SubArea | null) => {
        setSelectedArea(newSelectedArea);
    };
    const onAreaHovered = (newHoveredArea: SubArea | null) => {
        setHoveredArea(newHoveredArea);
    };

    return (
        <div className={styles.mapPageContainer}>
            <MapGrid onAreaSelected={onAreaSelected} onAreaHovered={onAreaHovered} />
            <SubAreaDetailsContainer hoveredArea={hoveredArea || null} selectedArea={selectedArea || null} />
        </div>
    );
}
