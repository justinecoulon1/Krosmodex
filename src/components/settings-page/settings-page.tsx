import styles from './settings-page.module.css';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import { useState } from 'react';
import { CustomNumberInput, CustomTextInput } from '../custom-components/custom-inputs';

export default function SettingsPageContainer() {
    const [metamobName, setMetamobName] = useState(getLocalStorageItem('metamobName') ?? '');
    const [metamobApiKey, setMetamobApiKey] = useState(getLocalStorageItem('metamobApiKey') ?? '');
    const [metamobUniqueId, setMetamobUniqueId] = useState(getLocalStorageItem('metamobUniqueId') ?? '');
    const [ocreAmount, setOcreAmount] = useState(getLocalStorageItem('ocreAmount')?.toString() ?? '1');

    return (
        <div className={styles.settingsPageContainer}>
            <div className={styles.settingTypeContainer}>
                <h2>Configuration Metamob</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor="pseudo-meta">Pseudo métamob</label>
                    <CustomTextInput
                        customStyle={styles.inputs}
                        value={metamobName}
                        onChange={(e) => {
                            setMetamobName(e.target.value);
                            setLocalStorageItem('metamobName', e.target.value);
                        }}
                        name="pseudo-meta"
                        id="pseudo-meta"
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="API-key">Clé API</label>
                    <CustomTextInput
                        customStyle={styles.inputs}
                        value={metamobApiKey}
                        onChange={(e) => {
                            setMetamobApiKey(e.target.value);
                            setLocalStorageItem('metamobApiKey', e.target.value);
                        }}
                        name="API-key"
                        id="API-key"
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="unique-id">Identifiant unique</label>
                    <CustomTextInput
                        customStyle={styles.inputs}
                        value={metamobUniqueId}
                        onChange={(e) => {
                            setMetamobUniqueId(e.target.value);
                            setLocalStorageItem('metamobUniqueId', e.target.value);
                        }}
                        name="unique-id"
                        id="unique-id"
                    />
                </div>
            </div>
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
                        name="ocre-amount"
                        id="ocre-amount"
                    />
                </div>
            </div>
        </div>
    );
}
