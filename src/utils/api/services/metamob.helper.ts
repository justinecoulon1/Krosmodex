import { MetamobMonsterDto, MetamobMonsterStatus, MetamobUpdateMonsterDto } from '../dto/metamob.dto';
import { getLocalStorageItem } from '../../local-storage/local-storage.utils';
import metamobService from './metamob.service';

export async function updateMonster({ monster, amount }: { monster: MetamobMonsterDto; amount: number }) {
    const ocreAmount = getLocalStorageItem('ocreAmount') || 1;
    const newMonsterStatus = getUpdatedMonsterStatus(amount, monster, ocreAmount);
    const metamobUpdateMonsterDto: MetamobUpdateMonsterDto = {
        id: monster.id,
        etat: newMonsterStatus,
        quantite: amount,
    };
    monster.quantite = amount;
    await metamobService.updateMonsters([metamobUpdateMonsterDto]);
}

function getUpdatedMonsterStatus(amount: number, monster: MetamobMonsterDto, ocreAmount: number): MetamobMonsterStatus {
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

export async function updateMonsters() {
    const monsters = await metamobService.getMonsters();
    const ocreAmount = getLocalStorageItem('ocreAmount') || 1;
    const updatedMonsters: MetamobUpdateMonsterDto[] = monsters.map((monster) => {
        const newMonsterStatus = getUpdatedMonsterStatus(monster.quantite, monster, ocreAmount);
        return {
            id: monster.id,
            etat: newMonsterStatus,
        };
    });
    await metamobService.updateMonsters(updatedMonsters);
}
