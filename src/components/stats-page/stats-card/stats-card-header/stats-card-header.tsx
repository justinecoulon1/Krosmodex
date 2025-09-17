import styles from './stats-card-header.module.css';
import { StatsCardGauge } from '../stats-card-gauge/stats-card-gauge';

export default function StatsCardHeader({ ocreNumber, gaugeValue }: { ocreNumber: number; gaugeValue: number }) {
    return (
        <div className={styles.statsCardHeader}>
            <h4>Ocre {ocreNumber}</h4>
            <StatsCardGauge value={gaugeValue} />
        </div>
    );
}
