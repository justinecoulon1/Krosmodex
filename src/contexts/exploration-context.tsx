import { createContext, ReactNode, useContext, useState } from 'react';
import { SubArea } from '../components/map-page/map-canvas/map-canvas.utils';
import { OVERWORLD_AREAS } from '../components/map-page/map-canvas/map-canvas-constants';

export type WorldMap = 'overworld' | 'underground';

export type ExplorationContextType = {
    selectedArea: SubArea | null;
    setSelectedArea: (newSelectedArea: SubArea | null) => void;
    subAreaLastExplorationTimeById: Map<number, number>;
    exploreSubArea: (newExploredArea: SubArea) => void;
    displayedAreas: SubArea[];
    setDisplayedAreas: (newDisplayedAreas: SubArea[]) => void;
    currentWorldMap: WorldMap;
    setCurrentWorldMap: (newWorldMap: WorldMap) => void;
};

const ExplorationContext = createContext<ExplorationContextType | undefined>(undefined);

export function useExplorationContext(): ExplorationContextType {
    const context = useContext(ExplorationContext);
    if (!context) {
        throw new Error('useExplorationContext must be used within a ExplorationProvider');
    }
    return context;
}

export function ExplorationProvider({ children }: { children: ReactNode }) {
    const [selectedArea, setSelectedArea] = useState<SubArea | null>(null);
    const [subAreaLastExplorationTimeById, setSubAreaLastExplorationTimeById] = useState<Map<number, number>>(
        new Map<number, number>(),
    );
    const exploreSubArea = (newExploredArea: SubArea) => {
        setSubAreaLastExplorationTimeById((oldValue) => new Map(oldValue.set(newExploredArea.subAreaId, Date.now())));
    };
    const [displayedAreas, setDisplayedAreas] = useState<SubArea[]>(OVERWORLD_AREAS);
    const [currentWorldMap, setCurrentWorldMap] = useState<WorldMap>('overworld');

    return (
        <ExplorationContext.Provider
            value={{
                selectedArea,
                setSelectedArea,
                displayedAreas,
                setDisplayedAreas,
                subAreaLastExplorationTimeById,
                exploreSubArea,
                currentWorldMap,
                setCurrentWorldMap,
            }}
        >
            {children}
        </ExplorationContext.Provider>
    );
}
