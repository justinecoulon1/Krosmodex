import styles from './settings-page.module.css';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import { useState } from 'react';
import { CustomTextInput } from '../custom-components/custom-inputs';

export default function SettingsPageContainer() {
    const [metamobName, setMetamobName] = useState(getLocalStorageItem('metamobName') ?? '');
    const [metamobApiKey, setMetamobApiKey] = useState(getLocalStorageItem('metamobApiKey') ?? '');
    const [metamobUniqueId, setMetamobUniqueId] = useState(getLocalStorageItem('metamobUniqueId') ?? '');

    return (
        <div className={styles.settingsPageContainer}>
            <div className={styles.metamobSettings}>
                <h1 className="text-5xl">Configuration Metamob</h1>
                <label htmlFor="">Pseudo métamob</label>
                <CustomTextInput
                    value={metamobName}
                    onChange={(e) => {
                        setMetamobName(e.target.value);
                        setLocalStorageItem('metamobName', e.target.value);
                    }}
                />

                <label htmlFor="">Clé API</label>
                <CustomTextInput
                    value={metamobApiKey}
                    onChange={(e) => {
                        setMetamobApiKey(e.target.value);
                        setLocalStorageItem('metamobApiKey', e.target.value);
                    }}
                />

                <label htmlFor="">Identifiant unique</label>
                <CustomTextInput
                    value={metamobUniqueId}
                    onChange={(e) => {
                        setMetamobUniqueId(e.target.value);
                        setLocalStorageItem('metamobUniqueId', e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
