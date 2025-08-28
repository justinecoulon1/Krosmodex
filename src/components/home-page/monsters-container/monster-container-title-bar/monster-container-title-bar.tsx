import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import { ReactNode, useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../../../utils/local-storage/local-storage.utils';
import _ from 'lodash';
import styles from './monster-container-title-bar.module.css';
import { ArrowDown01, ArrowDownAZ } from 'lucide-react';
import classNames from 'classnames';
import { SortResult, SortType } from '../monsters-container';

export default function MonsterContainerTitleBar({
    filteredMonsters,
    onSortChange,
}: {
    filteredMonsters: MetamobMonsterDto[];
    onSortChange: (sortResult: SortResult) => void;
}) {
    const [monsterSort, setMonsterSort] = useState<SortType>(
        (getLocalStorageItem('monsterSort') as SortType) ?? 'alphabetical',
    );
    useEffect(() => {
        const sortedMonsters = _.sortBy(
            filteredMonsters,
            (monster) => {
                if (monsterSort === 'alphabetical') {
                    return monster.nom;
                } else {
                    return monster.etape;
                }
            },
            (monster) => monster.id,
        );
        onSortChange({ sortType: monsterSort, sortedMonsters });
    }, [monsterSort, filteredMonsters]);
    return (
        <div className={styles.monsterContainerTitleBar}>
            <h3>Monstres</h3>
            <div className={styles.monsterContainerTitleBarButtons}>
                <SortButton currentSortType={monsterSort} sortType={'alphabetical'} onClick={setMonsterSort}>
                    <ArrowDownAZ />
                </SortButton>
                <SortButton currentSortType={monsterSort} sortType={'numerical'} onClick={setMonsterSort}>
                    <ArrowDown01 />
                </SortButton>
            </div>
        </div>
    );
}

function SortButton({
    currentSortType,
    sortType,
    onClick,
    children,
}: {
    currentSortType: SortType;
    sortType: SortType;
    onClick: (newSortType: SortType) => void;
    children: ReactNode;
}) {
    return (
        <button
            onClick={() => {
                setLocalStorageItem('monsterSort', sortType);
                onClick(sortType);
            }}
            className={classNames(currentSortType === sortType && styles.selected)}
        >
            {children}
        </button>
    );
}
