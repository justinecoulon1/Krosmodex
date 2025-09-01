import { useQuery } from '@tanstack/react-query';
import metamobService from './services/metamob.service';

export function useMetamobMonstersQuery() {
    return useQuery({
        queryKey: ['get_monsters'],
        queryFn: metamobService.getMonsters,
        refetchOnMount: false,
        initialData: [],
        retry: 2,
    });
}
