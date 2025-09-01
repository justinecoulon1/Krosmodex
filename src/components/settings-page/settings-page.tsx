import styles from './settings-page.module.css';
import MetamobConfigurationSettings from './metamob-configuration-settings';
import KrosmodexConfigurationSettings from './krosmodex-configuration-settings';

export default function SettingsPageContainer() {
    return (
        <div className={styles.settingsPageContainer}>
            <MetamobConfigurationSettings />
            <KrosmodexConfigurationSettings />
        </div>
    );
}
