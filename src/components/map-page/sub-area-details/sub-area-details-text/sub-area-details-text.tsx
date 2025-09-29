import { SubArea } from '../../map-canvas/map-canvas.utils';
import styles from './sub-area-details-text.module.css';
import { GREYED_AREAS } from '../../map-canvas/map-canvas-constants';
import { SubAreaDetailsType } from '../sub-area-details-container';
import { formatTimestamp } from '../../../../utils/string.utils';
import { useExplorationContext } from '../../../../contexts/exploration-context';

export default function SubAreaDetailsText({ subArea, type }: { subArea: SubArea | null; type: SubAreaDetailsType }) {
    const { subAreaLastExplorationTimeById } = useExplorationContext();
    return (
        <div className={styles.subAreaDetailsTextContainer}>
            {type === 'selected' ? <h3>Sous-zone sélectionnée :</h3> : <h3>Sous-zone survolée :</h3>}
            {subArea ? (
                <div className={styles.subAreaDetailsText}>
                    <p>{subArea.subAreaName}</p>
                    {GREYED_AREAS.includes(subArea?.subAreaId) && (
                        <p className={styles.noMonsterText}>Ne contient aucun archi-monstre</p>
                    )}
                    {subAreaLastExplorationTimeById.has(subArea.subAreaId) && (
                        <p className={styles.lastExplorationText}>
                            Dernière exploration à{' '}
                            {formatTimestamp(subAreaLastExplorationTimeById.get(subArea.subAreaId) ?? 0)}
                        </p>
                    )}
                </div>
            ) : type === 'selected' ? (
                <div className={styles.subAreaDetailsText}>
                    <p>Aucune sous-zone sélectionnée</p>
                </div>
            ) : (
                <div className={styles.subAreaDetailsText}>
                    <p>Aucune sous-zone survolée</p>
                </div>
            )}
        </div>
    );
}
