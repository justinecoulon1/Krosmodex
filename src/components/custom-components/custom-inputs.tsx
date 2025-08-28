export type CustomNumberInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    emptyDefaultValue?: number;
};

export function CustomNumberInput({ emptyDefaultValue = 0, ...props }: CustomNumberInputProps) {
    return (
        <input
            {...props}
            onFocus={(e) => {
                if (e.target.value === '0') {
                    if (props.onChange) {
                        e.target.value = '';
                        props.onChange(e);
                    }
                }
            }}
            onBlur={(e) => {
                if (props.onChange) {
                    e.target.value = e.target.value || emptyDefaultValue?.toString();
                    props.onChange(e);
                }
            }}
        />
    );
}
