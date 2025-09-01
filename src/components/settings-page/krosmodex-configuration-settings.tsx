import { useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import styles from './settings-page.module.css';
import { CustomNumberInput } from '../custom-components/custom-inputs';
import { useMetamobMonstersContext } from '../../contexts/metamob-monsters-context';

export default function KrosmodexConfigurationSettings() {
    const [ocreAmount, setOcreAmount] = useState(getLocalStorageItem('ocreAmount')?.toString() ?? '1');
    const { updateMonstersMutation } = useMetamobMonstersContext();
    const { mutateAsync, isPending, error } = updateMonstersMutation;
    return (
        <div className={styles.settingTypeContainer}>
            <h2>Configuration Krosmodex</h2>
            <div className={styles.inputContainer}>
                <label htmlFor="ocre-amount">Nombre d'ocres simultanés</label>
                <CustomNumberInput
                    customStyle={styles.inputs}
                    value={ocreAmount}
                    onChange={(e) => {
                        setOcreAmount(e.target.value);
                        setLocalStorageItem('ocreAmount', parseInt(e.target.value || '1'));
                    }}
                    disabled={isPending}
                    onBlur={async () => {
                        await mutateAsync();
                    }}
                    name="ocre-amount"
                    id="ocre-amount"
                />
                {error && <p>{error.message}</p>}
            </div>
        </div>
    );
}
