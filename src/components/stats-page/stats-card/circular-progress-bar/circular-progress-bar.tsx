import styles from './stats-card-gauge.module.css';
import { CSSProperties } from 'react';

export type ProgressCircleProps = {
    value: number;
    size?: string;
    strokeWidth?: string;
    backgroundColor?: string;
    strokeColor?: string;
};

export function CircularProgressBar({ value, size = '1.5rem', strokeWidth = '5px', ...props }: ProgressCircleProps) {
    return (
        <svg
            className={styles.circularProgress}
            width={`${size}`}
            height={`${size}`}
            style={
                {
                    '--progress': `${value}`,
                    '--size': `${size}`,
                    '--stroke-width': `${strokeWidth}`,
                    '--stroke-color': props.strokeColor,
                    '--background-color': props.backgroundColor,
                } as CSSProperties
            }
        >
            <circle className={styles.circleProgressBackground}></circle>
            <circle className={styles.circleProgressForeground}></circle>
        </svg>
    );
}
