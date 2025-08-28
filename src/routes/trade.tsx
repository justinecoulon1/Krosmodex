import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/trade')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-5xl">Trade</h1>
    </div>
  );
}
