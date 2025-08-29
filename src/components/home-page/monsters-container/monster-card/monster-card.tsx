import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import { Clipboard, Minus, Plus } from 'lucide-react';
import classNames from 'classnames';
import { CustomNumberInput } from '../../../custom-components/custom-inputs';
import { useState } from 'react';
import { getMonsterStatus } from '../../../../model/monsters/monsters.utils';

export default function MonsterCard({ monster }: { monster: MetamobMonsterDto }) {
    const monsterStatus = getMonsterStatus(monster);
    return (
        <div className={styles.monsterCard}>
            <MonsterCardTitleContainer monster={monster} />
            <div className={styles.monsterImageContainer}>
                <img
                    src={`./monsters/${monster.id}.png`}
                    alt={`${monster.nom} image`}
                    className={styles.monsterImage}
                />
            </div>
            <MonsterCardAmountSelector monster={monster} />
            <div className={styles.monsterStatusContainer}>
                {monsterStatus === 'searched' && 'Recherché'}
                {monsterStatus === 'offered' && 'Offert'}
                {monsterStatus === 'none' && 'Aucun'}
            </div>
        </div>
    );
}

function MonsterCardTitleContainer({ monster }: { monster: MetamobMonsterDto }) {
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

function MonsterCardAmountSelector({ monster }: { monster: MetamobMonsterDto }) {
    const [monsterAmount, setMonsterAmount] = useState(monster.quantite.toString());
    return (
        <div className={styles.monsterCardAmountSelectorContainer}>
            <button className={styles.amountButtons}>
                <Minus size={20} />
            </button>
            <CustomNumberInput
                customStyle={styles.monsterAmountInput}
                value={monsterAmount}
                onChange={(e) => {
                    setMonsterAmount(e.target.value);
                }}
            />
            <button className={styles.amountButtons}>
                <Plus size={20} />
            </button>
        </div>
    );
}
