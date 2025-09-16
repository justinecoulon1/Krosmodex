import styles from './map-page.module.css';
import MapGrid from './map-canvas/map-canvas';

export default function MapPageContainer() {
    return (
        <div className={styles.mapPageContainer}>
            <div className={styles.mapGridContainer}>
                <MapGrid />
            </div>
        </div>
    );
}
