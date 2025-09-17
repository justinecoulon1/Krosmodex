import { useMetamobMonstersQuery } from '../../utils/api/metamob.queries';
import { getLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import { useEffect } from 'react';
import styles from './stats-page.module.css';
import StatsPageContent from './stats-page-content/stats-page-content';
import { getOcreStats, OcreStat } from './stats-page-utils/stats-page.utils';
import StatsPageHeader from './stats-page-header/stats-page-header';

export default function StatsPageContainer() {
    const { data: monsters, refetch } = useMetamobMonstersQuery();

    useEffect(() => {
        void refetch();
    }, []);

    const ocreAmount = getLocalStorageItem('ocreAmount') ?? 1;
    const ocreStats: OcreStat[] = getOcreStats(ocreAmount, monsters ?? []);

    return (
        <div className={styles.statsPageMainContainer}>
            <div className={styles.statsPageContentContainer}>
                <StatsPageHeader />
                <StatsPageContent ocreStats={ocreStats} />
            </div>
        </div>
    );
}
