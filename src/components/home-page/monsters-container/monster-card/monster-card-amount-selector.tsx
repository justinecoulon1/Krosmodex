import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import { useState } from 'react';
import styles from './monster-card.module.css';
import { Minus, Plus } from 'lucide-react';
import { CustomNumberInput } from '../../../custom-components/custom-inputs/custom-inputs';
import { useMetamobMonstersContext } from '../../../../contexts/metamob-monsters-context';
import { useMetamobMonstersQuery } from '../../../../utils/api/metamob.queries';

export default function MonsterCardAmountSelector({ monster }: { monster: MetamobMonsterDto }) {
    const [monsterAmount, setMonsterAmount] = useState(monster.quantite.toString());
    const { updateMonstersMutation, updateMonsterMutation } = useMetamobMonstersContext();
    const { isFetching: isMonstersQueryFetching } = useMetamobMonstersQuery();
    const { isPending: isMonsterMutationPending, mutateAsync } = updateMonsterMutation;
    const { isPending: isMonstersMutationPending } = updateMonstersMutation;
    const disabled = isMonsterMutationPending || isMonstersMutationPending || isMonstersQueryFetching;

    return (
        <div className={styles.monsterCardAmountSelectorContainer}>
            <button
                className={styles.amountButtons}
                disabled={disabled}
                onClick={async () => {
                    const newMonsterAmount = Math.max(0, parseInt(monsterAmount || '0') - 1);
                    setMonsterAmount(newMonsterAmount.toString());
                    await mutateAsync({ monster, amount: newMonsterAmount });
                }}
            >
                <Minus size={20} color={disabled ? 'grey' : undefined} />
            </button>
            <CustomNumberInput
                disabled={disabled}
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
                    await mutateAsync({ monster, amount: newMonsterAmount });
                }}
            />
            <button
                className={styles.amountButtons}
                disabled={disabled}
                onClick={async () => {
                    const newMonsterAmount = parseInt(monsterAmount || '0') + 1;
                    setMonsterAmount(newMonsterAmount.toString());
                    await mutateAsync({ monster, amount: newMonsterAmount });
                }}
            >
                <Plus size={20} color={disabled ? 'grey' : undefined} />
            </button>
        </div>
    );
}
