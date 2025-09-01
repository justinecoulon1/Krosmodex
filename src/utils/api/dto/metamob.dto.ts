export type MetamobMonsterDto = {
    id: number;
    nom: string;
    type: MetamobMonsterType;
    image_url: string;
    etape: number;
    quantite: number;
    recherche: number;
    propose: number;
};

export type MetamobUpdateMonsterDto = {
    id: number;
    etat?: MetamobMonsterStatus;
    quantite?: number;
};

export type MetamobMonsterType = 'monstre' | 'archimonstre' | 'boss';
export type MetamobMonsterStatus = 'recherche' | 'propose' | 'aucun';
