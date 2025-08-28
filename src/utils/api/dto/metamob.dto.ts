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

export type MetamobMonsterType = 'monstre' | 'archimonstre' | 'boss';
