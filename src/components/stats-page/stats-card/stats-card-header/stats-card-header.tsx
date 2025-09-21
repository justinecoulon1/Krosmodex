import styles from './stats-card-header.module.css';
import { CircularProgressBar } from '../../../custom-components/circular-progress-bar/circular-progress-bar';

export default function StatsCardHeader({ ocreNumber, gaugeValue }: { ocreNumber: number; gaugeValue: number }) {
    return (
        <div className={styles.statsCardHeader}>
            <h4>Ocre {ocreNumber}</h4>
            <CircularProgressBar
                value={gaugeValue}
                size={'1.7rem'}
                strokeWidth={'6px'}
                backgroundColor={'var(--secondary-light)'}
            />
        </div>
    );
}
