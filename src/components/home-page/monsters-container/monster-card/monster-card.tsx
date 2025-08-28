import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import { Clipboard } from 'lucide-react';
import classNames from 'classnames';

export default function MonsterCard({ monster }: { monster: MetamobMonsterDto }) {
    return (
        <div className={styles.monsterCard}>
            <div className={styles.monsterCardTitle}>
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
        </div>
    );
}
