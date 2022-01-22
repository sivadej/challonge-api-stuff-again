import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { TourneyPath, Participant, PlayerMap } from '../interfaces';

const getPlayers = async (tourneyPath: TourneyPath) => {
  const { tourneyName, domain } = tourneyPath;
  const url =
    `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}/` +
    `participants.json?api_key=${process.env.REACT_APP_CHALLONGE_API_KEY}`;
  const { data } = await axios.get(url);
  return data;
};

export default function usePlayersQuery(tourneyPath: TourneyPath): UseQueryResult<PlayerMap> {
  const { tourneyName, domain } = tourneyPath;
  const queryRes = useQuery<Participant[]>(
    `${domain}${tourneyName}players`,
    () => getPlayers(tourneyPath),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data } = queryRes;
  const playerMap: PlayerMap = new Map();
  if (data && data.length) {
    for (const p of data) {
      const { participant: pInfo } = p;
      playerMap.set(pInfo.id, pInfo);
    }
  }
  return { ...queryRes, data: playerMap } as UseQueryResult<PlayerMap>;
}
