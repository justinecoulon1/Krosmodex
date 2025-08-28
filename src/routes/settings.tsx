import { createFileRoute } from '@tanstack/react-router';
import SettingsPageContainer from '../components/settings-page/settings-page';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsPageContainer />;
}
