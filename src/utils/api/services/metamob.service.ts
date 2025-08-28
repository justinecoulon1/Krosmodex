import { metamobAxios } from './metamob.axios';
import { MetamobMonsterDto } from '../dto/metamob.dto';
import { getLocalStorageItem } from '../../local-storage/local-storage.utils';

class MetamobService {
  async getMonsters() {
    const metamobUserName = getLocalStorageItem('metamobName');

    const response = await metamobAxios.get<MetamobMonsterDto[]>(`/utilisateurs/${metamobUserName}/monstres`);
    return response.data;
  }
}

export default new MetamobService();
