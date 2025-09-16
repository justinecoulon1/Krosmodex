import { useMetamobMonstersQuery } from '../../utils/api/metamob.queries';
import { getLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import { useEffect } from 'react';
import styles from './stats-page.module.css';
import StatsPageContent from './stats-page-content';

export type OcreStat = {
    ocreNumber: number;
    ownedMonstersAmount: number;
    ownedArchMonstersAmount: number;
    ownedBossAmount: number;
};

export default function StatsPageContainer() {
    const { data: monsters, refetch } = useMetamobMonstersQuery();

    useEffect(() => {
        void refetch();
    }, []);

    const ocreAmount = getLocalStorageItem('ocreAmount') ?? 1;

    const ocreStats: OcreStat[] = [];

    for (let i = 1; i <= ocreAmount; i++) {
        ocreStats.push({
            ocreNumber: i,
            ownedMonstersAmount: monsters
                .filter((monster) => monster.type === 'monstre')
                .filter((monster) => monster.quantite >= i).length,
            ownedArchMonstersAmount: monsters
                .filter((monster) => monster.type === 'archimonstre')
                .filter((monster) => monster.quantite >= i).length,
            ownedBossAmount: monsters
                .filter((monster) => monster.type === 'boss')
                .filter((monster) => monster.quantite >= i).length,
        });
    }
    return (
        <div className={styles.statsPageContainer}>
            <div className={styles.statsPageContentContainer}>
                <div className={styles.statsPageHeader}>
                    <h3>Statistiques</h3>
                </div>
                <StatsPageContent ocreStats={ocreStats} />
            </div>
        </div>
    );
}
