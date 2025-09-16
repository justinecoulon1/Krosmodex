import type { AnyRouter } from '@tanstack/router-core';
import React, { ReactNode } from 'react';
import styles from './side-bar.module.css';

export default function SideBarTab({
    path,
    router,
    children,
}: {
    path: string;
    router: AnyRouter;
    children: ReactNode;
}) {
    const { navigate } = router;
    return (
        <div
            className={styles.sideBarImagesContainer}
            onClick={async () => {
                await navigate({ to: path });
            }}
        >
            {children}
        </div>
    );
}
