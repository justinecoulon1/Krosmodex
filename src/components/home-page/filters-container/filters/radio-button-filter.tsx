import styles from '../filters.module.css';
import { FilterOption } from '../filters';

export function RadioButtonFilter({
    onOptionSelected,
    currentOption,
    options,
    title,
}: {
    onOptionSelected: (option: string) => void;
    currentOption: string;
    options: FilterOption<any>[];
    title: string;
}) {
    return (
        <div className={styles.filterContainer}>
            <h4>{title} :</h4>
            <div className={styles.filterOptionsContainer}>
                {options.map((option) => (
                    <div className={styles.filterOptions} onClick={() => onOptionSelected(option.key)}>
                        <input
                            type="radio"
                            key={option.key}
                            id={option.key}
                            name={option.key}
                            value={option.key}
                            checked={currentOption === option.key}
                            onChange={() => onOptionSelected(option.key)}
                            className={styles.filterInput}
                        />
                        <label htmlFor={option.key}>{option.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
