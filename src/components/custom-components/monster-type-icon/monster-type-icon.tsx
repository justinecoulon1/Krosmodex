import classNames from 'classnames';
import styles from './monster-type-icon.module.css';
import { MetamobMonsterType } from '../../../utils/api/dto/metamob.dto';

export default function MonsterTypeIcon({ monsterType }: { monsterType: MetamobMonsterType }) {
    return (
        <img
            src={`/${monsterType}.png`}
            alt="type"
            className={classNames(styles.monsterTypeIcon, styles[`${monsterType}`])}
        />
    );
}
