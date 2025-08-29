import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import { useState } from 'react';
import styles from './monster-card.module.css';
import { Minus, Plus } from 'lucide-react';
import { CustomNumberInput } from '../../../custom-components/custom-inputs';

export default function MonsterCardAmountSelector({ monster }: { monster: MetamobMonsterDto }) {
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
