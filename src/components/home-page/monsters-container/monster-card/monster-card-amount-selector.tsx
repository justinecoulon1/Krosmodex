import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import { useState } from 'react';
import styles from './monster-card.module.css';
import { Minus, Plus } from 'lucide-react';
import { CustomNumberInput } from '../../../custom-components/custom-inputs';
import { updateMonster } from '../../../../utils/api/services/metamob.helper';
import { useMetamobMonstersQuery } from '../../../../utils/api/metamob.queries';

export default function MonsterCardAmountSelector({ monster }: { monster: MetamobMonsterDto }) {
    const [monsterAmount, setMonsterAmount] = useState(monster.quantite.toString());
    const { refetch } = useMetamobMonstersQuery();
    return (
        <div className={styles.monsterCardAmountSelectorContainer}>
            <button
                className={styles.amountButtons}
                onClick={async () => {
                    const newMonsterAmount = Math.max(0, parseInt(monsterAmount || '0') - 1);
                    setMonsterAmount(newMonsterAmount.toString());
                    await updateMonster(monster, newMonsterAmount);
                    await refetch();
                }}
            >
                <Minus size={20} />
            </button>
            <CustomNumberInput
                customStyle={styles.monsterAmountInput}
                value={monsterAmount}
                onChange={(e) => {
                    setMonsterAmount(e.target.value);
                }}
                onBlur={async () => {
                    let newMonsterAmount = parseInt(monsterAmount || '0');
                    if (newMonsterAmount < 0) {
                        setMonsterAmount('0');
                        newMonsterAmount = 0;
                    }
                    await updateMonster(monster, newMonsterAmount);
                    await refetch();
                }}
            />
            <button
                className={styles.amountButtons}
                onClick={async () => {
                    const newMonsterAmount = parseInt(monsterAmount || '0') + 1;
                    setMonsterAmount(newMonsterAmount.toString());
                    await updateMonster(monster, newMonsterAmount);
                    await refetch();
                }}
            >
                <Plus size={20} />
            </button>
        </div>
    );
}
