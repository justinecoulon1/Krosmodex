import styles from './stats-card-element.module.css';
import { CircularProgressBar } from '../../../custom-components/circular-progress-bar/circular-progress-bar';
import MonsterTypeIcon from '../../../custom-components/monster-type-icon/monster-type-icon';
import { MetamobMonsterType } from '../../../../utils/api/dto/metamob.dto';

export default function StatsCardElement({
    label,
    type,
    value,
}: {
    label: string;
    type: MetamobMonsterType;
    value: number;
}) {
    return (
        <div className={styles.statsCardElement}>
            <div className={styles.statsCardElementLabelContainer}>
                <MonsterTypeIcon monsterType={type} />
                <p>{label}</p>
            </div>
            <CircularProgressBar value={value} />
        </div>
    );
}
