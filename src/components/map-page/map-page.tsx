import styles from './map-page.module.css';
import MapGrid from './map-canvas/map-canvas';
import { useState } from 'react';
import { SubArea } from './map-canvas/map-canvas.utils';

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
            <div className={styles.mapGridContainer}>
                <MapGrid onAreaSelected={onAreaSelected} onAreaHovered={onAreaHovered} />
            </div>
            <div className={styles.subAreaDetailsContainer}>
                <div className={styles.hoveredSubAreaDetailsContainer}>
                    <h3>Sous-zone survolée :</h3>
                    {hoveredArea ? <p>{hoveredArea.subAreaName}</p> : 'Aucune sous-zone survolée'}
                </div>
                <div className={styles.selectedSubAreaDetailsContainer}>
                    <h3>Sous-zone sélectionnée :</h3>
                    {selectedArea ? <p>{selectedArea.subAreaName}</p> : 'Aucune sous-zone sélectionnée'}
                </div>
            </div>
        </div>
    );
}
