import styles from './side-bar.module.css';
import type { AnyRouter } from '@tanstack/router-core';
import React from 'react';
import { ArrowLeftRight, Book, ChartNoAxesCombined, Map, Settings } from 'lucide-react';
import SideBarTab from './side-bar-tab';

export default function SideBarContainer({ router }: { router: AnyRouter }) {
    return (
        <div className={styles.sideBarContainer}>
            <SideBarTab path={`/`} router={router}>
                <Book size={32} />
            </SideBarTab>{' '}
            <SideBarTab path={`/stats`} router={router}>
                <ChartNoAxesCombined size={32} />
            </SideBarTab>
            <SideBarTab path={`/map`} router={router}>
                <Map size={32} />
            </SideBarTab>
            <SideBarTab path={`/trade`} router={router}>
                <ArrowLeftRight size={32} />
            </SideBarTab>
            <SideBarTab path={`/settings`} router={router}>
                <Settings size={32} />
            </SideBarTab>
        </div>
    );
}
