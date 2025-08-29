import { MetamobMonsterDto } from '../../utils/api/dto/metamob.dto';
import { MonsterStatus, MonsterType } from './monsters.types';

export function getMonsterType(metamobMonster: MetamobMonsterDto): MonsterType {
    switch (metamobMonster.type) {
        case 'monstre':
            return 'monsters';
        case 'archimonstre':
            return 'archmonsters';
        case 'boss':
            return 'boss';
        default:
            throw new Error(`Unexpected type: ${metamobMonster.type}`);
    }
}
export function getMonsterStatus(metamobMonster: MetamobMonsterDto): MonsterStatus {
    if (metamobMonster.propose) {
        return 'offered';
    } else if (metamobMonster.recherche) {
        return 'searched';
    } else {
        return 'none';
    }
}
