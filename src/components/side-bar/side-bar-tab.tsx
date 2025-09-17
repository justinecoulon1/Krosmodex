import React, { ReactNode } from 'react';
import styles from './side-bar.module.css';
import classNames from 'classnames';
import { useRouter, useRouterState } from '@tanstack/react-router';

export default function SideBarTab({ path, children }: { path: string; children: ReactNode }) {
    const router = useRouter();
    const { location } = useRouterState();
    return (
        <div
            className={classNames(styles.sideBarImagesContainer, {
                [styles.selected]: location.pathname === path,
            })}
            onClick={async () => {
                await router.navigate({ to: path });
            }}
        >
            {children}
        </div>
    );
}
