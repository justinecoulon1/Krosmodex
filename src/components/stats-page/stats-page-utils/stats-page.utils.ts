import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';

export type OcreStat = {
    ocreNumber: number;
    ownedMonstersAmount: number;
    ownedArchMonstersAmount: number;
    ownedBossAmount: number;
};

export function getOcreStats(ocreAmount: number, monsters: MetamobMonsterDto[]) {
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
    return ocreStats;
}
