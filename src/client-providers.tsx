'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MetamobMonstersProvider } from './contexts/metamob-monsters-context';

const queryClient = new QueryClient();

export function ClientProviders({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            <MetamobMonstersProvider>{children}</MetamobMonstersProvider>
        </QueryClientProvider>
    );
}
