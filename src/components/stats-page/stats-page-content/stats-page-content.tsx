import styles from './stats-page-content.module.css';
import StatsCard from '../stats-card/stats-card';
import { PropagateLoader } from 'react-spinners';
import { TERTIARY_COLOR } from '../../../app-constants';
import classNames from 'classnames';
import { useMetamobMonstersQuery } from '../../../utils/api/metamob.queries';
import { OcreStat } from '../stats-page-utils/stats-page.utils';

export default function StatsPageContent({ ocreStats }: { ocreStats: OcreStat[] }) {
    const { isFetching, error } = useMetamobMonstersQuery();
    if (isFetching) {
        return <LoaderContainer />;
    } else if (error) {
        return <ErrorContainer />;
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

function LoaderContainer() {
    return (
        <div className={classNames(styles.statsPageContent, styles.statsPageLoaderContainer)}>
            <PropagateLoader size={10} color={TERTIARY_COLOR} />
        </div>
    );
}

function ErrorContainer() {
    return (
        <p className={classNames(styles.statsPageContent, styles.error)}>
            Récupération des statistiques des ocres échouée, veuillez vérifier les paramères.
        </p>
    );
}
