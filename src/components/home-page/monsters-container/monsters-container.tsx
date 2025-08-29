import styles from './monsters-container.module.css';
import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import { VirtuosoGrid } from 'react-virtuoso';
import classNames from 'classnames';
import MonsterCard from './monster-card/monster-card';

export default function MonstersContainer({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
    return (
        <div className={styles.monstersContainer}>
            <MonsterContainerTitleBar />
            <CardsGrid filteredMonsters={filteredMonsters} />
        </div>
    );
}

function MonsterContainerTitleBar() {
    return (
        <div className={styles.monsterContainerTitleBar}>
            <h3>Monstres</h3>
        </div>
    );
}

function CardsGrid({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
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
            itemContent={(index) => <MonsterCard monster={filteredMonsters[index]} />}
        />
    );
}
