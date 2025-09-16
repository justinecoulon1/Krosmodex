import { useMetamobMonstersQuery } from '../../utils/api/metamob.queries';
import { getLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import StatsCard from './stats-container/stats-card';
import { useEffect } from 'react';

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

    for (let i = 0; i <= ocreAmount; i++) {
        ocreStats.push({
            ocreNumber: i + 1,
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
        <div>
            {ocreStats.map((stats) => (
                <StatsCard stats={stats} key={`ocre-stats-${stats.ocreNumber}`} />
            ))}
        </div>
    );
}
