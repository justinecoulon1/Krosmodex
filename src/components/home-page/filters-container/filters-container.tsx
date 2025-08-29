import styles from './filters.module.css';
import { useEffect, useState } from 'react';
import { MetamobMonsterDto } from '../../../utils/api/dto/metamob.dto';
import {
    matchesMonsterType,
    matchesSearchStatus,
    MonsterStatusKey,
    monsterTypeFilterOptions,
    MonsterTypeKey,
    searchStatusFilterOptions,
} from './filters';
import { normalizeString } from '../../../utils/string.utils';
import { RadioButtonFilter } from './filters/radio-button-filter';
import MonsterNameFilter from './filters/monster-name-filter';
import AmountFilter from './filters/amount-filter';
import StepsFilter from './filters/steps-filter';

export default function FiltersContainer({
    allMonsters,
    onFilteredMonstersUpdated,
}: {
    allMonsters: MetamobMonsterDto[];
    onFilteredMonstersUpdated: (monsters: MetamobMonsterDto[]) => void;
}) {
    const [selectedMonsterType, setSelectedMonsterType] = useState(monsterTypeFilterOptions[2].key);
    const [selectedSearchStatus, setSelectedSearchStatus] = useState(searchStatusFilterOptions[0].key);
    const [searchedMonsterName, setSearchedMonsterName] = useState('');
    const [searchedMonsterAmount, setSearchedMonsterAmount] = useState('0');
    const [selectedStep, setSelectedStep] = useState('0');

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
                )
                .filter((monster) => selectedStep === '0' || monster.etape.toString() === selectedStep)
                .sort((monster1, monster2) => monster1.nom.localeCompare(monster2.nom)),
        );
    }, [
        allMonsters,
        selectedMonsterType,
        selectedSearchStatus,
        searchedMonsterName,
        searchedMonsterAmount,
        selectedStep,
    ]);
    return (
        <div className={styles.filters}>
            <div className={styles.filtersTitle}>
                <h3>Filtres</h3>
            </div>
            <div className={styles.filtersContainer}>
                <MonsterNameFilter
                    searchedMonsterName={searchedMonsterName}
                    onMonsterNameChange={(val) => setSearchedMonsterName(val)}
                />
                <RadioButtonFilter
                    title={'Type'}
                    currentOption={selectedMonsterType}
                    options={monsterTypeFilterOptions}
                    onOptionSelected={(optionKey) => setSelectedMonsterType(optionKey as MonsterTypeKey)}
                />
                <RadioButtonFilter
                    title={'Status'}
                    currentOption={selectedSearchStatus}
                    options={searchStatusFilterOptions}
                    onOptionSelected={(optionKey) => setSelectedSearchStatus(optionKey as MonsterStatusKey)}
                />
                <AmountFilter
                    searchedMonsterAmount={searchedMonsterAmount}
                    onMonsterAmountChange={(val) => setSearchedMonsterAmount(val)}
                />
                <StepsFilter selectedStep={selectedStep} onStepChange={(step) => setSelectedStep(step)} />
            </div>
        </div>
    );
}
