import { PlacesType, Tooltip } from 'react-tooltip';
import styles from './basic-tooltip.module.css';

export default function BasicTooltip({
    content,
    anchor,
    position = 'top',
    delayShow = 200,
}: {
    content: string;
    anchor: string;
    position?: PlacesType;
    delayShow?: number;
}) {
    return (
        <div className={styles.tooltipContainer}>
            <Tooltip
                className={styles.tooltip}
                content={content}
                anchorSelect={anchor}
                place={position}
                delayShow={delayShow}
            />
        </div>
    );
}
