import styles from '../filters.module.css';
import { CustomNumberInput } from '../../../custom-components/custom-inputs';

export default function AmountFilter({
    searchedMonsterAmount,
    onMonsterAmountChange,
}: {
    searchedMonsterAmount: string;
    onMonsterAmountChange: (val: string) => void;
}) {
    return (
        <div className={styles.filterOptionsContainer}>
            <div>
                <label htmlFor="amount-search-bar">
                    <h4>Quantité minimale :</h4>
                </label>
                <CustomNumberInput
                    name="amount-search-bar"
                    id="amount-search-bar"
                    value={searchedMonsterAmount}
                    onChange={(e) => onMonsterAmountChange(e.target.value)}
                    selectAllOnFocus={true}
                />
            </div>
        </div>
    );
}
