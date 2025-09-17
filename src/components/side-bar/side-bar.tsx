import { ArrowLeftRight, Book, ChartNoAxesCombined, Map, Settings } from 'lucide-react';
import SideBarTab from './side-bar-tab';
import styles from './side-bar.module.css';
import React from 'react';

type Tab = {
    path: string;
    icon: React.ComponentType<{ size?: number }>;
};

const tabs: Tab[] = [
    { path: '/', icon: Book },
    { path: '/stats', icon: ChartNoAxesCombined },
    { path: '/map', icon: Map },
    { path: '/trade', icon: ArrowLeftRight },
    { path: '/settings', icon: Settings },
];

export default function SideBarContainer() {
    return (
        <div className={styles.sideBarContainer}>
            {tabs.map(({ path, icon: Icon }) => (
                <SideBarTab key={path} path={path}>
                    <Icon size={32} />
                </SideBarTab>
            ))}
        </div>
    );
}
