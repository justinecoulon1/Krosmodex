import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import { Clipboard } from 'lucide-react';
import BasicTooltip from '../../../custom-components/tooltip/basic-tooltip';
import MonsterTypeIcon from '../../../custom-components/monster-type-icon/monster-type-icon';

export default function MonsterCardTitleContainer({ monster }: { monster: MetamobMonsterDto }) {
    return (
        <div className={styles.monsterCardTitleContainer}>
            <MonsterTypeIcon monsterType={monster.type} />
            <p className={styles.monsterName}>{monster.nom}</p>
            <button
                className={styles.clipboardButton}
                id={'clipboardButton'}
                onClick={() => navigator.clipboard.writeText(monster.nom)}
            >
                <Clipboard size={20} />
            </button>
            <BasicTooltip anchor={'#clipboardButton'} content="Copy to clipboard" position={'bottom-end'} />
        </div>
    );
}
