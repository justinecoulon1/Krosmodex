import React from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ClientProviders } from './client-providers';
import styles from './title-bar.module.css';
import SideBarContainer from './components/side-bar/side-bar';
import { Toaster } from 'react-hot-toast';

const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const root = createRoot(document.body);
root.render(
    <ClientProviders>
        <div className={styles.titleBar}>
            <img src="/orange-frog-logo.png" alt="logo" className={styles.logo} />
            <p className={styles.appName}>KROSMODEX</p>
        </div>
        <div className={styles.mainContainer}>
            <SideBarContainer router={router} />
            <RouterProvider router={router} />
            <Toaster
                toastOptions={{
                    style: {
                        backgroundColor: 'var(--primary-dark)',
                        color: 'var(--secondary)',
                        border: '2px solid var(--primary-light)',
                        fontSize: '1.1rem',
                    },
                    position: 'bottom-right',
                }}
            />
        </div>
    </ClientProviders>,
);
