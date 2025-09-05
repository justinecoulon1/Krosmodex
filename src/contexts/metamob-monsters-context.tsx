import { createContext, ReactNode, useContext } from 'react';
import { useMetamobMonstersQuery } from '../utils/api/metamob.queries';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { MetamobMonsterDto } from '../utils/api/dto/metamob.dto';
import { updateMonster, updateMonsters } from '../utils/api/services/metamob.helper';
import metamobService from '../utils/api/services/metamob.service';
import toast from 'react-hot-toast';
import { MonsterIcon } from '../utils/ui/toaster/toaster.utils';

export type MetamobMonstersContextType = {
    updateMonsterMutation: UseMutationResult<
        void,
        Error,
        {
            monster: MetamobMonsterDto;
            amount: number;
        },
        unknown
    >;
    updateMonstersMutation: UseMutationResult<void, Error, void, unknown>;
    checkMetamobConnectionMutation: UseMutationResult<void, Error, void, unknown>;
};

const MetamobMonstersContext = createContext<MetamobMonstersContextType>({} as MetamobMonstersContextType);

export function useMetamobMonstersContext(): MetamobMonstersContextType {
    const context = useContext(MetamobMonstersContext);
    if (!context) {
        throw new Error('useMetamobMonstersContext must be used within a MetamobMonstersProvider');
    }
    return context;
}

export function MetamobMonstersProvider({ children }: { children: ReactNode }) {
    const updateMonsterMutation = useMetamobMonsterMutation();
    const updateMonstersMutation = useMetamobMonstersMutation();
    const checkMetamobConnectionMutation = useCheckMetamobConnectionMutation();

    return (
        <MetamobMonstersContext.Provider
            value={{
                updateMonsterMutation,
                updateMonstersMutation,
                checkMetamobConnectionMutation,
            }}
        >
            {children}
        </MetamobMonstersContext.Provider>
    );
}

function useMetamobMonstersMutation() {
    const { refetch } = useMetamobMonstersQuery();
    return useMutation({
        mutationKey: ['update_monsters'],
        mutationFn: async () => {
            try {
                await updateMonsters();
                await refetch();
                toast.success('Monstres mis à jour correctement');
            } catch (error) {
                toast.error('Erreur lors de la mise à jour des monstres');
            }
        },
        retry: 2,
    });
}

function useMetamobMonsterMutation() {
    const { refetch } = useMetamobMonstersQuery();
    return useMutation({
        mutationKey: ['update_monster'],
        mutationFn: async (params: { monster: MetamobMonsterDto; amount: number }) => {
            try {
                await updateMonster(params);
                await refetch();
                toast.success('Monstre mis à jour correctement', {
                    icon: <MonsterIcon monsterId={params.monster.id} />,
                    style: { border: '2px solid green' },
                });
            } catch (error) {
                toast.error('Erreur lors de la mise à jour du monstre', {
                    icon: <MonsterIcon monsterId={params.monster.id} />,
                    style: { border: '2px solid red' },
                });
            }
        },
        retry: 2,
    });
}

function useCheckMetamobConnectionMutation() {
    return useMutation({
        mutationKey: ['check_metamob_connection'],
        mutationFn: metamobService.checkConnection,
        retryDelay: 500,
        retry: 2,
    });
}
