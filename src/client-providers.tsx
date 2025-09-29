'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MetamobMonstersProvider } from './contexts/metamob-monsters-context';
import { ReactNode } from 'react';
import { ExplorationProvider } from './contexts/exploration-context';

const queryClient = new QueryClient();

export function ClientProviders({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            <ExplorationProvider>
                <MetamobMonstersProvider>{children}</MetamobMonstersProvider>
            </ExplorationProvider>
        </QueryClientProvider>
    );
}
