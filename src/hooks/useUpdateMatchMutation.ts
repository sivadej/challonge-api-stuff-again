import { useMutation } from 'react-query';
import axios from 'axios';
import { ChallongerLocalStorage } from '../interfaces';

export const putUpdateMatch = async ({
  matchId,
  playerId,
  settings,
  score = '',
}: {
  matchId: number;
  playerId: number;
  score?: string;
  settings: ChallongerLocalStorage;
}) => {
  const { config, tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  const { challongeKey } = config || {};
  const url = `https://api.challonge.com/v1/tournaments/${domain}-${tourneyName}/matches/${matchId}.json?api_key=${challongeKey}`;
  const body = {
    match: {
      winner_id: playerId,
      scores_csv: score,
    },
  };
  const res = await axios.put(url, body);
  if (res) return res;
  return null;
};

export default function useUpdateMatchMutation() {
  return useMutation(putUpdateMatch);
}
