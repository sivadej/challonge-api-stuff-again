import { useQuery } from 'react-query';
import axios from 'axios';
import {
  ChallongerLocalStorage,
  Tournament,
  TournamentInfo,
  TournamentEntities,
} from '../interfaces';

const buildEntities = (data: Tournament[] | null): TournamentEntities => {
  const ids: number[] = [];
  const entities: { [key: number]: TournamentInfo } = {};
  data?.forEach(t => {
    const { tournament } = t;
    ids.push(tournament.id);
    entities[tournament.id] = tournament;
  })
  return {
    ids,
    entities,
  };
}

const getTournamentList = async (
  settings: ChallongerLocalStorage
): Promise<TournamentEntities> => {
  const {
    config: { challongeKey },
    tourney: { domain },
  } = settings;
  const url = `https://api.challonge.com/v1/tournaments.json?api_key=${challongeKey}`;
  const params = {
    subdomain: domain,
    created_after: '2022-01-01',
  };
  const { data } = await axios.get<Tournament[] | null>(url, { params });
  return buildEntities(data);
};

export default function useTournamentListQuery(
  settings: ChallongerLocalStorage
) {
  return useQuery<TournamentEntities>(
    ['tournamentList'],
    () => getTournamentList(settings),
    {
      staleTime: Infinity,
    }
  );
}
