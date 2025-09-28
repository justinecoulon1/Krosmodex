import styles from './sub-area-details-container.module.css';
import { SubArea } from '../map-canvas/map-canvas.utils';
import SubAreaDetailsText from './sub-area-details-text/sub-area-details-text';

export type SubAreaDetailsType = 'hovered' | 'selected';

export default function SubAreaDetailsContainer({
    hoveredArea,
    selectedArea,
}: {
    hoveredArea: SubArea | null;
    selectedArea: SubArea | null;
}) {
    return (
        <div className={styles.subAreaDetailsContainer}>
            <SubAreaDetailsText subArea={hoveredArea} type={'hovered'} />
            <SubAreaDetailsText subArea={selectedArea} type={'selected'} />
        </div>
    );
}
