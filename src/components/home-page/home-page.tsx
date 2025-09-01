import styles from './home-page.module.css';
import { useEffect, useState } from 'react';
import MonstersContainer from './monsters-container/monsters-container';
import FiltersContainer from './filters-container/filters-container';
import { useMetamobMonstersQuery } from '../../utils/api/metamob.queries';

export default function HomePageContainer() {
    const { data: allMonsters, refetch } = useMetamobMonstersQuery();
    const [filteredMonsters, setFilteredMonsters] = useState(allMonsters);

    useEffect(() => {
        void refetch();
    }, []);

    return (
        <div className={styles.homePageContainer}>
            <FiltersContainer allMonsters={allMonsters} onFilteredMonstersUpdated={setFilteredMonsters} />
            <MonstersContainer filteredMonsters={filteredMonsters} />
        </div>
    );
}
