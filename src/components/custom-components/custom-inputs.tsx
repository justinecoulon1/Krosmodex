import classNames from 'classnames';
import styles from './custom-inputs.module.css';

export type CustomNumberInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    emptyDefaultValue?: number;
    customStyle?: string;
};

export function CustomNumberInput({
    emptyDefaultValue = 0,
    customStyle,
    onFocus,
    onBlur,
    ...props
}: CustomNumberInputProps) {
    return (
        <input
            {...props}
            type="number"
            className={classNames(styles.customNumberInput, customStyle)}
            onFocus={(e) => {
                if (props.onChange) {
                    if (e.target.value === '0') {
                        e.target.value = '';
                        props.onChange(e);
                    }
                }
                if (onFocus) {
                    onFocus(e);
                }
            }}
            onBlur={(e) => {
                if (props.onChange) {
                    e.target.value = e.target.value || emptyDefaultValue?.toString();
                    props.onChange(e);
                }
                if (onBlur) {
                    onBlur(e);
                }
            }}
        />
    );
}

export type CustomTextInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    customStyle?: string;
};

export function CustomTextInput({ customStyle, ...props }: CustomTextInputProps) {
    return <input {...props} type="text" className={classNames(styles.customTextInput, customStyle)} />;
}
