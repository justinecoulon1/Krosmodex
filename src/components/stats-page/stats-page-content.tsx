import styles from './stats-page.module.css';
import StatsCard from './stats-container/stats-card';
import { OcreStat } from './stats-page';
import { PropagateLoader } from 'react-spinners';
import { TERTIARY_COLOR } from '../../app-constants';
import classNames from 'classnames';
import { useMetamobMonstersQuery } from '../../utils/api/metamob.queries';

export default function StatsPageContent({ ocreStats }: { ocreStats: OcreStat[] }) {
    const { isFetching, error } = useMetamobMonstersQuery();
    if (isFetching) {
        return (
            <div className={classNames(styles.statsPageContent, styles.statsPageLoaderContainer)}>
                <PropagateLoader size={10} color={TERTIARY_COLOR} />
            </div>
        );
    } else if (error) {
        return (
            <p className={classNames(styles.statsPageContent, styles.error)}>
                Récupération de monstres échouée, veuillez vérifier les paramères Metamob.
            </p>
        );
    } else {
        return (
            <div className={styles.statsPageContent}>
                {ocreStats.map((stats) => (
                    <StatsCard stats={stats} key={`ocre-stats-${stats.ocreNumber}`} />
                ))}
            </div>
        );
    }
}
