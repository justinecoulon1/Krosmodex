import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import MonsterCardTitleContainer from './monster-card-title-container';
import MonsterCardImageContainer from './monster-card-image-container';
import MonsterCardAmountSelector from './monster-card-amount-selector';
import MonsterCardStatusIndicator from './monster-card-status-indicator';

export default function MonsterCard({ monster, ocreAmount }: { monster: MetamobMonsterDto; ocreAmount: number }) {
    return (
        <div className={styles.monsterCard}>
            <MonsterCardTitleContainer monster={monster} />
            <MonsterCardImageContainer monster={monster} />
            <MonsterCardAmountSelector monster={monster} />
            <MonsterCardStatusIndicator monster={monster} ocreAmount={ocreAmount} />
        </div>
    );
}
