import styles from './side-bar.module.css';
import type { AnyRouter } from '@tanstack/router-core';
import React from 'react';
import { ArrowLeftRight, Book, Settings } from 'lucide-react';

export default function SideBarContainer({ router }: { router: AnyRouter }) {
  const { navigate } = router;
  return (
    <div className={styles.sideBarContainer}>
      <div
        className={styles.sideBarImagesContainer}
        onClick={async () => {
          await navigate({ to: `/` });
        }}
      >
        <Book size={32} />
      </div>
      <div
        className={styles.sideBarImagesContainer}
        onClick={async () => {
          await navigate({ to: `/trade` });
        }}
      >
        <ArrowLeftRight size={32} />
      </div>
      <div
        className={styles.sideBarImagesContainer}
        onClick={async () => {
          await navigate({ to: `/settings` });
        }}
      >
        <Settings size={32} />
      </div>
    </div>
  );
}
