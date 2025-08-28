import styles from './filters.module.css';
import { useEffect, useState } from 'react';
import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import {
    matchesMonsterType,
    matchesSearchStatus,
    monsterTypeFilterOptions,
    MonsterTypeKey,
    searchStatusFilterOptions,
    SearchStatusKey,
} from './filters';
import { Filter } from './filter-component';
import { normalizeString } from '../../../utils/string.utils';
import { CustomNumberInput, CustomTextInput } from '../../custom-components/custom-inputs';

export default function FiltersContainer({
    allMonsters,
    onFilteredMonstersUpdated,
}: {
    allMonsters: MetamobMonsterDto[];
    onFilteredMonstersUpdated: (monsters: MetamobMonsterDto[]) => void;
}) {
    const [selectedMonsterType, setSelectedMonsterType] = useState(monsterTypeFilterOptions[0].key);
    const [selectedSearchStatus, setSelectedSearchStatus] = useState(searchStatusFilterOptions[0].key);
    const [searchedMonsterName, setSearchedMonsterName] = useState('');
    const [searchedMonsterAmount, setSearchedMonsterAmount] = useState('0');
    useEffect(() => {
        const monsterAmount = searchedMonsterAmount ? parseInt(searchedMonsterAmount) : 0;
        onFilteredMonstersUpdated(
            allMonsters
                .filter((monster) => matchesMonsterType(monster, selectedMonsterType))
                .filter((monster) => matchesSearchStatus(monster, selectedSearchStatus))
                .filter((monster) => monster.quantite >= monsterAmount)
                .filter(
                    (monster) =>
                        !searchedMonsterName ||
                        normalizeString(monster.nom).includes(normalizeString(searchedMonsterName)),
                ),
        );
    }, [allMonsters, selectedMonsterType, selectedSearchStatus, searchedMonsterName, searchedMonsterAmount]);
    return (
        <div className={styles.filters}>
            <div className={styles.filtersTitle}>
                <h3>Filtres</h3>
            </div>
            <div className={styles.filtersContainer}>
                <div>
                    <label className={styles.filterLabel} htmlFor="name-search-bar">
                        Nom du monstre :
                    </label>
                    <CustomTextInput
                        name="name-search-bar"
                        id="name-search-bar"
                        type="text"
                        value={searchedMonsterName}
                        onChange={(e) => setSearchedMonsterName(e.target.value)}
                    />
                </div>
                <Filter
                    title={'Type'}
                    currentOption={selectedMonsterType}
                    options={monsterTypeFilterOptions}
                    onOptionSelected={(optionKey) => setSelectedMonsterType(optionKey as MonsterTypeKey)}
                />
                <Filter
                    title={'Status'}
                    currentOption={selectedSearchStatus}
                    options={searchStatusFilterOptions}
                    onOptionSelected={(optionKey) => setSelectedSearchStatus(optionKey as SearchStatusKey)}
                />
                <div>
                    <label className={styles.filterLabel} htmlFor="amount-search-bar">
                        Quantité :
                    </label>
                    <CustomNumberInput
                        name="amount-search-bar"
                        id="amount-search-bar"
                        value={searchedMonsterAmount}
                        onChange={(e) => setSearchedMonsterAmount(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
