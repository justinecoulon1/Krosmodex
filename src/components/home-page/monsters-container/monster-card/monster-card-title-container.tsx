import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import classNames from 'classnames';
import { Clipboard } from 'lucide-react';

export default function MonsterCardTitleContainer({ monster }: { monster: MetamobMonsterDto }) {
    return (
        <div className={styles.monsterCardTitleContainer}>
            <img
                src={`/${monster.type}.png`}
                alt="type"
                className={classNames(styles.monsterTypeIcon, styles[`${monster.type}`])}
            />
            <p className={styles.monsterName}>{monster.nom}</p>
            <button onClick={() => navigator.clipboard.writeText(monster.nom)}>
                <Clipboard size={20} />
            </button>
        </div>
    );
}
