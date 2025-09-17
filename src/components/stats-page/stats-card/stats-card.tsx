import styles from './stats-card.module.css';
import { OcreStat } from '../stats-page-utils/stats-page.utils';
import StatsCardElement from './stats-card-element/stats-card-element';
import StatsCardHeader from './stats-card-header/stats-card-header';

const MAX_ARCHMONSTERS = 286;
const MAX_MONSTERS = 300;
const MAX_BOSSES = 50;
const MAX_TOTAL = 636;

type StatsCardInfo = { label: string; value: number };

export default function StatsCard({ stats }: { stats: OcreStat }) {
    const statsCardInfo: StatsCardInfo[] = [
        { label: `Monstres : ${stats.ownedMonstersAmount}`, value: (stats.ownedMonstersAmount / MAX_MONSTERS) * 100 },
        {
            label: `Archi-monstres : ${stats.ownedArchMonstersAmount}`,
            value: (stats.ownedArchMonstersAmount / MAX_ARCHMONSTERS) * 100,
        },
        { label: `Gardiens de donjon : ${stats.ownedBossAmount}`, value: (stats.ownedBossAmount / MAX_BOSSES) * 100 },
    ];
    return (
        <div className={styles.statsCard}>
            <StatsCardHeader ocreNumber={stats.ocreNumber} gaugeValue={(stats.ownedTotalMonster / MAX_TOTAL) * 100} />
            <div className={styles.statsCardContent}>
                {statsCardInfo.map((info) => (
                    <StatsCardElement label={info.label} value={info.value} />
                ))}
            </div>
        </div>
    );
}
