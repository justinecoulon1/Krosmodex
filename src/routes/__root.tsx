import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';
import styles from '../pages-styles/main.module.css';

export const Route = createRootRoute({
  component: () => (
    <>
      <main className={styles.main}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
