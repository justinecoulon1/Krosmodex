import styles from './monsters-container.module.css';
import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import { VirtuosoGrid } from 'react-virtuoso';
import classNames from 'classnames';
import MonsterCard from './monster-card/monster-card';
import { getLocalStorageItem } from '../../../utils/local-storage/local-storage.utils';
import { useMetamobMonstersQuery } from '../../../utils/api/metamob.queries';
import { PropagateLoader } from 'react-spinners';

export default function MonstersContainer({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
    return (
        <div className={styles.monstersContainer}>
            <MonsterContainerTitleBar filteredMonsters={filteredMonsters} />
            <MonstersContainerMainContent filteredMonsters={filteredMonsters} />
        </div>
    );
}

function MonsterContainerTitleBar({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
    return (
        <div className={styles.monsterContainerTitleBar}>
            <h3>Monstres</h3>
            <p>Nombre de monstres affichés : {filteredMonsters.length}</p>
        </div>
    );
}

function CardsGrid({ filteredMonsters, ocreAmount }: { filteredMonsters: MetamobMonsterDto[]; ocreAmount: number }) {
    return (
        <VirtuosoGrid
            components={{
                Header: () => <div style={{ height: '1rem' }} />,
                Footer: () => <div style={{ height: '1rem' }} />,
                List: ({ children, className, ...props }) => (
                    <div className={classNames(styles.monsterCardGridContainer, className)} {...props}>
                        {children}
                    </div>
                ),
            }}
            totalCount={filteredMonsters.length}
            itemContent={(index) => <MonsterCard monster={filteredMonsters[index]} ocreAmount={ocreAmount} />}
        />
    );
}

function MonstersContainerMainContent({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
    const { isFetching, error } = useMetamobMonstersQuery();
    if (isFetching) {
        return (
            <div className={styles.monstersContainerMainContent}>
                <PropagateLoader size={10} color={'white'} />
            </div>
        );
    } else if (error) {
        return (
            <p className={styles.monstersContainerMainContent}>
                Récupération de monstres échouée, veuillez vérifier les paramères Metamob.
            </p>
        );
    } else {
        const ocreAmount = getLocalStorageItem('ocreAmount') ?? 1;
        return <CardsGrid filteredMonsters={filteredMonsters} ocreAmount={ocreAmount} />;
    }
}
