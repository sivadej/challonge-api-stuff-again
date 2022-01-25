import { useMutation } from 'react-query';
import axios from 'axios';

export const putUpdateMatch = async ({matchId, playerId}: { matchId: number, playerId: number }) => {
  const url = `https://api.challonge.com/v1/tournaments/akg-test1030/matches/${matchId}.json?api_key=MjMH0cfTX5IkpiyzB3PuhXrFzmfn6y0ihJ8PwZPs`;
  const body = {
    match: {
      winner_id: playerId,
      scores_csv: '1-1',
    },
  }
  const res = await axios.put(url, body);
  if (res) return res;
  return null;
};

export default function useUpdateMatchMutation() {
  return useMutation(putUpdateMatch);
}
