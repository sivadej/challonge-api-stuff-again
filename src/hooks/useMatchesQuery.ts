import { useQuery } from 'react-query';
import axios from 'axios';
import { Match, ChallongerLocalStorage } from '../interfaces';

const getMatches = async (settings: ChallongerLocalStorage) => {
  const { config, tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  const { challongeKey } = config || {};
  const url = `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}/matches.json?api_key=${challongeKey}`;
  const { data } = await axios.get<Match[]>(url);
  if (!data) return [];
  return data;
};

export default function useMatchesQuery(settings: ChallongerLocalStorage) {
  const { tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  return useQuery<Match[]>(
    [`${domain}-${tourneyName}`, 'matches'],
    () => getMatches(settings),
    {
      refetchInterval: 20000,
    }
  );
}
