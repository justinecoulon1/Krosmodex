import { useQuery } from '@tanstack/react-query';
import metamobService from './services/metamob.service';

export function useMetamobMonstersQuery() {
  return useQuery({
    queryKey: ['get_monsters'],
    queryFn: metamobService.getMonsters,
    initialData: [],
    retry: 3,
  });
}
