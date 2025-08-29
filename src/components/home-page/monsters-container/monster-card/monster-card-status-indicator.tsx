import { MetamobMonsterDto } from '../../../../utils/api/dto/metamob.dto';
import styles from './monster-card.module.css';
import classNames from 'classnames';
import { getMonsterStatus, getMonsterType } from '../../../../model/monsters/monsters.utils';
import { useMetamobMonstersQuery } from '../../../../utils/api/metamob.queries';

export default function MonsterCardStatusIndicator({
    monster,
    ocreAmount,
}: {
    monster: MetamobMonsterDto;
    ocreAmount: number;
}) {
    return (
        <div className={styles.monsterStatusContainer}>
            <div className={classNames(styles.monsterStatus, getMonsterSearchStatusStyle(monster, ocreAmount))}>
                <p>{getMonsterSearchStatusText(monster)}</p>
            </div>
        </div>
    );
}

function getMonsterSearchStatusStyle(monster: MetamobMonsterDto, ocreAmount: number): string {
    const monsterStatus = getMonsterStatus(monster);
    const monsterAmount = monster.quantite;
    if (monsterStatus === 'offered') {
        return styles.offered;
    } else if (monsterAmount >= ocreAmount) {
        return styles.none;
    } else {
        return styles.searched;
    }
}

function getMonsterSearchStatusText(monster: MetamobMonsterDto) {
    const { isFetching } = useMetamobMonstersQuery();
    const monsterType = getMonsterType(monster);
    if (isFetching) {
        return '...';
    } else if (monsterType === 'archmonsters') {
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
