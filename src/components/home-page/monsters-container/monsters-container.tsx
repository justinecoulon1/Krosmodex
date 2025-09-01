import styles from './monsters-container.module.css';
import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import { VirtuosoGrid } from 'react-virtuoso';
import classNames from 'classnames';
import MonsterCard from './monster-card/monster-card';
import { getLocalStorageItem } from '../../../utils/local-storage/local-storage.utils';

export default function MonstersContainer({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
    const ocreAmount = getLocalStorageItem('ocreAmount') ?? 1;
    return (
        <div className={styles.monstersContainer}>
            <MonsterContainerTitleBar filteredMonsters={filteredMonsters} />
            <CardsGrid filteredMonsters={filteredMonsters} ocreAmount={ocreAmount} />
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
