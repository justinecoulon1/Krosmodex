import styles from '../filters.module.css';
import { CustomTextInput } from '../../../custom-components/custom-inputs';

export default function MonsterNameFilter({
    searchedMonsterName,
    onMonsterNameChange,
}: {
    searchedMonsterName: string;
    onMonsterNameChange: (val: string) => void;
}) {
    return (
        <div className={styles.filterOptionsContainer}>
            <div>
                <label htmlFor="name-search-bar">
                    <h4>Nom du monstre :</h4>
                </label>
                <CustomTextInput
                    name="name-search-bar"
                    id="name-search-bar"
                    value={searchedMonsterName}
                    onChange={(e) => onMonsterNameChange(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
        </div>
    );
}
