import classNames from 'classnames';
import styles from './custom-inputs.module.css';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type CustomNumberInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    emptyDefaultValue?: number;
    customStyle?: string;
    selectAllOnFocus?: boolean;
};

export function CustomNumberInput({
    emptyDefaultValue = 0,
    customStyle,
    selectAllOnFocus = false,
    ...props
}: CustomNumberInputProps) {
    return (
        <input
            {...props}
            type="number"
            className={classNames(styles.customNumberInput, customStyle)}
            onFocus={(e) => {
                if (selectAllOnFocus) {
                    e.target.select();
                }
                if (props.onFocus) {
                    props.onFocus(e);
                }
            }}
            onBlur={(e) => {
                if (props.onChange) {
                    e.target.value = e.target.value || emptyDefaultValue?.toString();
                    props.onChange(e);
                }
                if (props.onBlur) {
                    props.onBlur(e);
                }
            }}
        />
    );
}

export type CustomTextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    customStyle?: string;
    selectAllOnFocus?: boolean;
};

export function CustomTextInput({ customStyle, selectAllOnFocus = false, ...props }: CustomTextInputProps) {
    return (
        <input
            {...props}
            type="text"
            className={classNames(styles.customTextInput, customStyle)}
            onFocus={(e) => {
                if (selectAllOnFocus) {
                    e.target.select();
                }
                if (props.onFocus) {
                    props.onFocus(e);
                }
            }}
        />
    );
}
