import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';
import styles from '../pages-styles/main.module.css';
import SideBarContainer from '../components/side-bar/side-bar';

export const Route = createRootRoute({
    component: () => (
        <>
            <SideBarContainer />
            <main className={styles.main}>
                <Outlet />
            </main>
            <TanStackRouterDevtools />
        </>
    ),
});
