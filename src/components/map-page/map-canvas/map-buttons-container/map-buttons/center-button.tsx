import { useControls } from 'react-zoom-pan-pinch';
import styles from './buttons.module.css';
import { Crosshair } from 'lucide-react';
import BasicTooltip from '../../../../custom-components/tooltip/basic-tooltip';

export default function CenterButton() {
    const { resetTransform } = useControls();
    return (
        <div className={styles.buttonContainer}>
            <button id={'centerButton'} onClick={() => resetTransform()}>
                <Crosshair />
            </button>
            <BasicTooltip anchor={'#centerButton'} content="Center map" position={'bottom-start'} delayShow={350} />
        </div>
    );
}
