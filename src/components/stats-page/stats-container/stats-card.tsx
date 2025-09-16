import { OcreStat } from '../stats-page';
import styles from './stats-card.module.css';

export default function StatsCard({ stats }: { stats: OcreStat }) {
    return (
        <div className={styles.statsCard}>
            <p>Ocre {stats.ocreNumber}</p>
            <p>Monstres : {stats.ownedMonstersAmount}</p>
            <p>Archi-monstres : {stats.ownedArchMonstersAmount}</p>
            <p>Gardiens de donjon : {stats.ownedBossAmount}</p>
        </div>
    );
}
