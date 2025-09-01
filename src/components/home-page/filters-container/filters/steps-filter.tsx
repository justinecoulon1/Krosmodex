import styles from '../filters.module.css';
import classNames from 'classnames';
import { Check } from 'lucide-react';

const steps = Array.from({ length: 35 }, (_, i) => i.toString());

export default function StepsFilter({
    selectedStep,
    onStepChange,
}: {
    selectedStep: string;
    onStepChange: (step: string) => void;
}) {
    return (
        <div className={styles.stepFilterContainer}>
            <h4>Étapes :</h4>
            <div className={styles.stepFilter}>
                {steps.map((step) => (
                    <StepButton
                        key={`step-filter-${step}`}
                        currentlySelectedStep={selectedStep}
                        stepButtonValue={step}
                        onButtonSelected={onStepChange}
                    />
                ))}
            </div>
        </div>
    );
}

function StepButton({
    stepButtonValue,
    currentlySelectedStep,
    onButtonSelected,
}: {
    stepButtonValue: string;
    currentlySelectedStep: string;
    onButtonSelected: (step: string) => void;
}) {
    const isCurrentlySelected = currentlySelectedStep === stepButtonValue;
    return (
        <button
            className={classNames(styles.stepButton, isCurrentlySelected && styles.selected)}
            onClick={() => {
                if (!isCurrentlySelected) {
                    onButtonSelected(stepButtonValue);
                }
            }}
        >
            {stepButtonValue === '0' ? <Check size={14} /> : stepButtonValue}
        </button>
    );
}
