import styles from './monsters-container.module.css';
import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import { useState } from 'react';
import _ from 'lodash';
import MonsterCard from './monster-card/monster-card';
import MonsterContainerTitleBar from './monster-container-title-bar/monster-container-title-bar';

export type SortType = 'alphabetical' | 'numerical';
export type SortResult = {
    sortType: SortType;
    sortedMonsters: MetamobMonsterDto[];
};

export default function MonstersContainer({ filteredMonsters }: { filteredMonsters: MetamobMonsterDto[] }) {
    const [sortResult, setSortResult] = useState<SortResult>({
        sortType: 'alphabetical',
        sortedMonsters: [],
    });
    return (
        <div className={styles.monstersContainer}>
            <MonsterContainerTitleBar filteredMonsters={filteredMonsters} onSortChange={setSortResult} />
            <div className={styles.monstersCardsContainer}>
                {sortResult.sortType === 'alphabetical' &&
                    sortResult.sortedMonsters.map((monster) => <MonsterCard monster={monster} key={monster.id} />)}
                {sortResult.sortType === 'numerical' && <StepSortedCardList monsters={sortResult.sortedMonsters} />}
            </div>
        </div>
    );
}

function StepSortedCardList({ monsters }: { monsters: MetamobMonsterDto[] }) {
    const monstersByStep = _.groupBy(monsters, (monster) => monster.etape);
    return (
        <div className={styles.stepSortedListContainer}>
            {Object.entries(monstersByStep).map(([step, monsters]) => (
                <div className={styles.stepContainer}>
                    <h3>Étape {step}</h3>
                    <div className={styles.cardListContainer}>
                        {monsters.map((monster) => (
                            <MonsterCard monster={monster} key={monster.id} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
