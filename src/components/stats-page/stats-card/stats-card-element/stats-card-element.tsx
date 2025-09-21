import styles from './stats-card-element.module.css';
import { CircularProgressBar } from '../../../custom-components/circular-progress-bar/circular-progress-bar';

export default function StatsCardElement({ label, value }: { label: string; value: number }) {
    return (
        <div className={styles.statsCardElement}>
            <p>{label}</p>
            <CircularProgressBar value={value} />
        </div>
    );
}
