import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import { MonsterStatus, MonsterType } from '../../../model/monsters/monsters.types';
import { getMonsterStatus, getMonsterType } from '../../../model/monsters/monsters.utils';

export type FilterOption<T> = {
    key: T;
    label: string;
};
export type MonsterTypeKey = 'all' | MonsterType;
export type MonsterStatusKey = 'any' | MonsterStatus;

export const monsterTypeFilterOptions: FilterOption<MonsterTypeKey>[] = [
    { key: 'all', label: 'Tous' },
    { key: 'monsters', label: 'Monstres' },
    { key: 'archmonsters', label: 'Archi-monstres' },
    { key: 'boss', label: 'Gardiens de donjon' },
];

export const searchStatusFilterOptions: FilterOption<MonsterStatusKey>[] = [
    { key: 'any', label: 'Tous' },
    { key: 'searched', label: 'Recherché' },
    { key: 'offered', label: 'Proposé' },
    { key: 'none', label: 'Aucun' },
];

export function matchesMonsterType(monster: MetamobMonsterDto, type: MonsterTypeKey) {
    switch (type) {
        case 'all':
            return true;
        default:
            return getMonsterType(monster) === type;
    }
}
export function matchesSearchStatus(monster: MetamobMonsterDto, status: MonsterStatusKey) {
    switch (status) {
        case 'any':
            return true;
        default:
            return getMonsterStatus(monster) === status;
    }
}
