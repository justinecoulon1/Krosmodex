import styles from './home-page.module.css';
import { useState } from 'react';
import { useMetamobMonstersQuery } from '../../utils/api/metamob.queries';
import MonstersContainer from './monsters-container/monsters-container';
import FiltersContainer from './filters/filters-container';

export default function HomePageContainer() {
    const { data: allMonsters, isLoading, error } = useMetamobMonstersQuery();
    const [filteredMonsters, setFilteredMonsters] = useState(allMonsters);

    return (
        <div className={styles.homePageContainer}>
            <FiltersContainer allMonsters={allMonsters} onFilteredMonstersUpdated={setFilteredMonsters} />
            <MonstersContainer filteredMonsters={filteredMonsters} />
        </div>
    );
}
