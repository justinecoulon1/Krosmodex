import { OcreStat } from '../stats-page';
import styles from './stats-card.module.css';

export default function StatsCard({ stats }: { stats: OcreStat }) {
    return (
        <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>
                <h4>Ocre {stats.ocreNumber}</h4>
            </div>
            <div className={styles.statsCardContent}>
                <p>Monstres : {stats.ownedMonstersAmount}</p>
                <p>Archi-monstres : {stats.ownedArchMonstersAmount}</p>
                <p>Gardiens de donjon : {stats.ownedBossAmount}</p>
            </div>
        </div>
    );
}
