import styles from './map-buttons-container.module.css';
import CenterButton from './map-buttons/center-button';
import ChangeWorldButton from './map-buttons/change-world-button';

export default function MapButtonsContainer() {
    return (
        <div className={styles.mapButtonsContainer}>
            <CenterButton />
            <ChangeWorldButton />
        </div>
    );
}
