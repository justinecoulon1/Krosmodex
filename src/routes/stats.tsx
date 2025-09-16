import { createFileRoute } from '@tanstack/react-router';
import StatsPageContainer from '../components/stats-page/stats-page';

export const Route = createFileRoute('/stats')({
    component: RouteComponent,
});

function RouteComponent() {
    return <StatsPageContainer />;
}
