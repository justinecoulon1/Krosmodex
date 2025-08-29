import { MetamobMonsterDto, MetamobMonsterStatus, MetamobUpdateMonsterDto } from '../dto/metamob.dto';
import { getLocalStorageItem } from '../../local-storage/local-storage.utils';
import metamobService from './metamob.service';

export async function updateMonster(monster: MetamobMonsterDto, amount: number) {
    const newMonsterStatus = getUpdatedMonsterStatus(amount, monster);
    const metamobUpdateMonsterDto: MetamobUpdateMonsterDto = {
        id: monster.id,
        etat: newMonsterStatus,
        quantite: amount,
    };
    await metamobService.updateMonsters([metamobUpdateMonsterDto]);
}

function getUpdatedMonsterStatus(amount: number, monster: MetamobMonsterDto): MetamobMonsterStatus {
    const ocreAmount = getLocalStorageItem('ocreAmount') || 1;
    if (monster.type !== 'archimonstre') {
        return 'aucun';
    } else if (amount > ocreAmount) {
        return 'propose';
    } else if (amount < ocreAmount) {
        return 'recherche';
    } else {
        return 'aucun';
    }
}
