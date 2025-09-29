import styles from './stats-card.module.css';
import { OcreStat } from '../stats-page-utils/stats-page.utils';
import StatsCardElement from './stats-card-element/stats-card-element';
import StatsCardHeader from './stats-card-header/stats-card-header';
import { MetamobMonsterType } from '../../../utils/api/dto/metamob.dto';

const MAX_ARCHMONSTERS = 286;
const MAX_MONSTERS = 300;
const MAX_BOSSES = 50;
const MAX_TOTAL = 636;

type StatsCardInfo = { label: string; value: number; type: MetamobMonsterType };

export default function StatsCard({ stats }: { stats: OcreStat }) {
    const statsCardInfo: StatsCardInfo[] = [
        {
            label: `Archi-monstres : ${stats.ownedArchMonstersAmount}`,
            value: (stats.ownedArchMonstersAmount / MAX_ARCHMONSTERS) * 100,
            type: 'archimonstre',
        },
        {
            label: `Gardiens de donjon : ${stats.ownedBossAmount}`,
            value: (stats.ownedBossAmount / MAX_BOSSES) * 100,
            type: 'boss',
        },
        {
            label: `Monstres : ${stats.ownedMonstersAmount}`,
            value: (stats.ownedMonstersAmount / MAX_MONSTERS) * 100,
            type: 'monstre',
        },
    ];
    return (
        <div className={styles.statsCard}>
            <StatsCardHeader ocreNumber={stats.ocreNumber} gaugeValue={(stats.ownedTotalMonster / MAX_TOTAL) * 100} />
            <div className={styles.statsCardContent}>
                {statsCardInfo.map((info, index) => (
                    <StatsCardElement
                        label={info.label}
                        type={info.type}
                        value={info.value}
                        key={`stats-card-element-${index}-${info.label}-${info.value}`}
                    />
                ))}
            </div>
        </div>
    );
}
