import styles from '../filters.module.css';
import { CustomTextInput } from '../../../custom-components/custom-inputs';

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
                <CustomTextInput
                    name="amount-search-bar"
                    id="amount-search-bar"
                    value={searchedMonsterAmount}
                    onChange={(e) => onMonsterAmountChange(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
        </div>
    );
}
