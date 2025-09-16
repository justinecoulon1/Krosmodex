import { createFileRoute } from '@tanstack/react-router';
import MapPageContainer from '../components/map-page/map-page';

export const Route = createFileRoute('/map')({
    component: RouteComponent,
});

function RouteComponent() {
    return <MapPageContainer />;
}
