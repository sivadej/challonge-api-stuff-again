import { useMutation } from 'react-query';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { ChallongerLocalStorage } from '../interfaces';

export const postReopenMatch = async ({
  matchId,
  settings,
}: {
  matchId: number;
  settings: ChallongerLocalStorage;
}) => {
  const {
    config: { challongeKey },
    tourney: { domain, tourneyName },
  } = settings;
  const url = `${API_BASE_URL}/match/reopen`;
  const body = {
    subdomain: domain,
    name: tourneyName,
    api_key: challongeKey,
    match_id: matchId,
  };
  const res = await axios.post(url, body);
  console.log(res);
  return res;
};

export default function useUpdateMatchMutation() {
  return useMutation(postReopenMatch);
}
