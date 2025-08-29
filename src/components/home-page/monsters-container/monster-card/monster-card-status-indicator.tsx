import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import classNames from 'classnames';
import { getMonsterStatus, getMonsterType } from '../../../../model/monsters/monsters.utils';

export default function MonsterCardStatusIndicator({
    monster,
    ocreAmount,
}: {
    monster: MetamobMonsterDto;
    ocreAmount: number;
}) {
    return (
        <div className={styles.monsterStatusContainer}>
            <p className={classNames(styles.monsterStatus, getMonsterSearchStatusStyle(monster, ocreAmount))}>
                {getMonsterSearchStatusText(monster)}
            </p>
        </div>
    );
}

function getMonsterSearchStatusStyle(monster: MetamobMonsterDto, ocreAmount: number): string {
    const monsterType = getMonsterType(monster);
    if (monsterType === 'archmonsters') {
        const monsterStatus = getMonsterStatus(monster);
        switch (monsterStatus) {
            case 'searched':
                return styles.searched;
            case 'none':
                return styles.none;
            case 'offered':
                return styles.offered;
            default:
                throw new Error(`Unexpected status ${monsterStatus}`);
        }
    } else {
        const monsterAmount = monster.quantite;
        if (monsterAmount >= ocreAmount) {
            return styles.none;
        } else {
            return styles.searched;
        }
    }
}
function getMonsterSearchStatusText(monster: MetamobMonsterDto) {
    const monsterType = getMonsterType(monster);
    if (monsterType === 'archmonsters') {
        const monsterStatus = getMonsterStatus(monster);
        switch (monsterStatus) {
            case 'searched':
                return 'Recherché';
            case 'none':
                return '/';
            case 'offered':
                return 'Proposé';
            default:
                throw new Error(`Unexpected status ${monsterStatus}`);
        }
    } else {
        return '';
    }
}
