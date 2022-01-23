import { useQuery } from 'react-query';
import axios from 'axios';
import {
  ChallongerLocalStorage,
  Tournament,
  TournamentInfo,
} from '../interfaces';

const getTournament = async (
  settings: ChallongerLocalStorage
): Promise<TournamentInfo | null> => {
  const { config, tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  const { challongeKey } = config || {};
  const url = `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}.json?api_key=${challongeKey}`;
  const { data } = await axios.get<Tournament>(url);
  const { tournament } = data || {};
  if (!tournament) return null;
  return tournament;
};

export default function useTournamentQuery(settings: ChallongerLocalStorage) {
  const { tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  return useQuery<TournamentInfo | null>(
    [`${domain}-${tourneyName}`, 'tournament'],
    () => getTournament(settings),
    {
      staleTime: Infinity,
    }
  );
}
