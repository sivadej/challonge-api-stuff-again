import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { Participant, PlayerMap, ChallongerLocalStorage, ParticipantInfo } from '../interfaces';

const transformToPlayerMap = (data: Participant[]): PlayerMap => {
  const playerMap: PlayerMap = new Map<number, ParticipantInfo>();
  if (!data) return playerMap;
  for (const p of data) {
    const { participant: pInfo } = p;
    playerMap.set(pInfo.id, pInfo);
  }
  return playerMap;
};

const getPlayers = async (settings: ChallongerLocalStorage) => {
  const { config, tourney } = settings ?? {};
  const { domain, tourneyName } = tourney ?? {};
  const { challongeKey } = config ?? {};
  const url =
    `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}/` +
    `participants.json?api_key=${challongeKey}`;
  const { data } = await axios.get<Participant[]>(url);
  return transformToPlayerMap(data);
};

export default function usePlayersQuery(
  settings: ChallongerLocalStorage
): UseQueryResult<PlayerMap> {
  const { tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  return useQuery([`${domain}-${tourneyName}`, 'players'], () =>
    getPlayers(settings)
  );
}
