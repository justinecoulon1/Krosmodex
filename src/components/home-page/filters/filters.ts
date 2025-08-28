import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';

export type FilterOption<T> = {
    key: T;
    label: string;
};

export type MonsterTypeKey = 'all' | 'monsters' | 'archmonsters' | 'boss';
export type SearchStatusKey = 'any' | 'searched' | 'offered' | 'none';

export const monsterTypeFilterOptions: FilterOption<MonsterTypeKey>[] = [
    { key: 'all', label: 'Tous' },
    { key: 'monsters', label: 'Monstres' },
    { key: 'archmonsters', label: 'Archi-monstres' },
    { key: 'boss', label: 'Gardiens de donjon' },
];

export const searchStatusFilterOptions: FilterOption<SearchStatusKey>[] = [
    { key: 'any', label: 'Tous' },
    { key: 'searched', label: 'Recherché' },
    { key: 'offered', label: 'Proposé' },
    { key: 'none', label: 'Aucun' },
];

export function matchesMonsterType(monster: MetamobMonsterDto, type: MonsterTypeKey) {
    switch (type) {
        case 'all':
            return true;
        case 'monsters':
            return monster.type === 'monstre';
        case 'archmonsters':
            return monster.type === 'archimonstre';
        case 'boss':
            return monster.type === 'boss';
        default:
            return false;
    }
}
export function matchesSearchStatus(monster: MetamobMonsterDto, status: SearchStatusKey) {
    switch (status) {
        case 'any':
            return true;
        case 'searched':
            return monster.recherche > 0;
        case 'none':
            return monster.recherche === 0 && monster.propose === 0;
        case 'offered':
            return monster.propose > 0;
        default:
            return false;
    }
}
