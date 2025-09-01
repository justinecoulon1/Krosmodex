import { useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import styles from './settings-page.module.css';
import { CustomTextInput } from '../custom-components/custom-inputs';
import { useMetamobMonstersContext } from '../../contexts/metamob-monsters-context';
import { MoonLoader } from 'react-spinners';
import { Check, X } from 'lucide-react';

export default function MetamobConfigurationSettings() {
    const [metamobName, setMetamobName] = useState(getLocalStorageItem('metamobName') ?? '');
    const [metamobApiKey, setMetamobApiKey] = useState(getLocalStorageItem('metamobApiKey') ?? '');
    const [metamobUniqueId, setMetamobUniqueId] = useState(getLocalStorageItem('metamobUniqueId') ?? '');
    const { checkMetamobConnectionMutation } = useMetamobMonstersContext();

    async function checkMetamobConnection() {
        await checkMetamobConnectionMutation.mutateAsync();
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            void checkMetamobConnection();
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [metamobName, metamobApiKey, metamobUniqueId]);

    return (
        <div className={styles.settingTypeContainer}>
            <h2>Configuration Metamob</h2>
            <div className={styles.inputContainer}>
                <label htmlFor="pseudo-meta">Pseudo métamob</label>
                <CustomTextInput
                    name="pseudo-meta"
                    id="pseudo-meta"
                    customStyle={styles.inputs}
                    value={metamobName}
                    onChange={(e) => {
                        setMetamobName(e.target.value);
                        setLocalStorageItem('metamobName', e.target.value);
                    }}
                />
            </div>

            <div className={styles.inputContainer}>
                <label htmlFor="API-key">Clé API</label>
                <CustomTextInput
                    name="API-key"
                    id="API-key"
                    customStyle={styles.inputs}
                    value={metamobApiKey}
                    onChange={(e) => {
                        setMetamobApiKey(e.target.value);
                        setLocalStorageItem('metamobApiKey', e.target.value);
                    }}
                />
            </div>

            <div className={styles.inputContainer}>
                <label htmlFor="unique-id">Identifiant unique</label>
                <CustomTextInput
                    name="unique-id"
                    id="unique-id"
                    customStyle={styles.inputs}
                    value={metamobUniqueId}
                    onChange={(e) => {
                        setMetamobUniqueId(e.target.value);
                        setLocalStorageItem('metamobUniqueId', e.target.value);
                    }}
                />
            </div>
            <div className={styles.inputContainer}>
                <label>Status de connection à Metamob</label>
                <CheckMetamobConnectionStatus />
            </div>
        </div>
    );
}

function CheckMetamobConnectionStatus() {
    const { checkMetamobConnectionMutation } = useMetamobMonstersContext();

    if (checkMetamobConnectionMutation.isPending) {
        return <MoonLoader color={'white'} size={20} />;
    } else if (checkMetamobConnectionMutation.isError) {
        return <X color={'red'} />;
    } else {
        return <Check color={'green'} />;
    }
}
