import { SubArea } from '../../map-canvas/map-canvas.utils';
import styles from './sub-area-details-text.module.css';
import { GREYED_AREAS } from '../../map-canvas/map-canvas-constants';
import { SubAreaDetailsType } from '../sub-area-details-container';

export default function SubAreaDetailsText({ subArea, type }: { subArea: SubArea | null; type: SubAreaDetailsType }) {
    return (
        <div className={styles.subAreaDetailsTextContainer}>
            {type === 'selected' ? <h3>Sous-zone sélectionnée :</h3> : <h3>Sous-zone survolée :</h3>}
            {subArea ? (
                <div>
                    <p>{subArea.subAreaName}</p>
                    {GREYED_AREAS.includes(subArea?.subAreaId) && (
                        <p className={styles.importantText}>Ne contient aucun archi-monstre</p>
                    )}
                </div>
            ) : type === 'selected' ? (
                <p>Aucune sous-zone sélectionnée</p>
            ) : (
                <p>Aucune sous-zone survolée</p>
            )}
        </div>
    );
}
