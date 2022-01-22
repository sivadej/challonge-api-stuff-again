import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { Participant, PlayerMap, ChallongerLocalStorage } from '../interfaces';

const getPlayers = async (settings: ChallongerLocalStorage) => {
  const { config, tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  const { challongeKey } = config || {};
  const url =
    `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}/` +
    `participants.json?api_key=${challongeKey}`;
  const { data } = await axios.get(url);
  return data;
};

export default function usePlayersQuery(
  settings: ChallongerLocalStorage
): UseQueryResult<PlayerMap> {
  const { tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  const queryRes = useQuery<Participant[]>(
    `${domain}${tourneyName}players`,
    () => getPlayers(settings),
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
