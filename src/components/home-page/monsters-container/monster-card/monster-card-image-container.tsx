import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';

export default function MonsterCardImageContainer({ monster }: { monster: MetamobMonsterDto }) {
    return (
        <div className={styles.monsterImageContainer}>
            <img src={`./monsters/${monster.id}.png`} alt={`${monster.nom} image`} className={styles.monsterImage} />
        </div>
    );
}
