import { useQuery } from 'react-query';
import axios from 'axios';
import { Match, TourneyPath } from '../interfaces';

const getMatches = async (tourneyPath: TourneyPath) => {
  const { tourneyName, domain } = tourneyPath;
  const url = `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}/matches.json?api_key=${process.env.REACT_APP_CHALLONGE_API_KEY}`;
  const { data } = await axios.get(url);
  return data;
};

export default function useMatches(tourneyPath: TourneyPath) {
  const { tourneyName, domain } = tourneyPath;
  return useQuery<Match[]>(`${domain}${tourneyName}matches`, () => getMatches(tourneyPath), {
    // refetchInterval: 30000,
    // refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
}
