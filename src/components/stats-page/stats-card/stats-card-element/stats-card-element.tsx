import styles from './stats-card-element.module.css';
import { StatsCardGauge } from '../stats-card-gauge/stats-card-gauge';

export default function StatsCardElement({ label, value }: { label: string; value: number }) {
    return (
        <div className={styles.statsCardElement}>
            <p>{label}</p>
            <StatsCardGauge value={value} />
        </div>
    );
}
