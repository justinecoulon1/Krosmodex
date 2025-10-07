import styles from './buttons.module.css';
import { SquaresSubtract } from 'lucide-react';
import BasicTooltip from '../../../../custom-components/tooltip/basic-tooltip';
import { useExplorationContext } from '../../../../../contexts/exploration-context';
import { OVERWORLD_AREAS, UNDERGROUND_AREAS } from '../../map-canvas-constants';

export default function ChangeWorldButton() {
    const { currentWorldMap, setCurrentWorldMap, setDisplayedAreas } = useExplorationContext();
    const changeArea = () => {
        if (currentWorldMap === 'overworld') {
            setCurrentWorldMap('underground');
            setDisplayedAreas(UNDERGROUND_AREAS);
        } else {
            setCurrentWorldMap('overworld');
            setDisplayedAreas(OVERWORLD_AREAS);
        }
    };
    return (
        <div className={styles.buttonContainer}>
            <button id={'changeMapButton'} onClick={changeArea}>
                <SquaresSubtract />
            </button>
            <BasicTooltip
                anchor={'#changeMapButton'}
                content="Change world map"
                position={'bottom-start'}
                delayShow={350}
            />
        </div>
    );
}
