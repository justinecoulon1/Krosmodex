import styles from './map-page.module.css';
import MapGrid from './map-canvas/map-canvas';
import { SubArea } from './map-canvas/map-canvas.utils';
import SubAreaDetailsContainer from './sub-area-details/sub-area-details-container';
import { useState } from 'react';
import { useExplorationContext } from '../../contexts/exploration-context';

export default function MapPageContainer() {
    const { selectedArea, setSelectedArea, exploreSubArea } = useExplorationContext();
    const [hoveredArea, setHoveredArea] = useState<SubArea | null>(null);

    const onAreaHovered = (newHoveredArea: SubArea | null) => {
        setHoveredArea(newHoveredArea);
    };

    return (
        <div className={styles.mapPageContainer}>
            <MapGrid
                onAreaSelected={setSelectedArea}
                onAreaHovered={onAreaHovered}
                onAreaRightClicked={exploreSubArea}
            />
            <SubAreaDetailsContainer hoveredArea={hoveredArea || null} selectedArea={selectedArea || null} />
        </div>
    );
}
