import React from 'react';
import useMatchesQuery from '../hooks/useMatchesQuery';
import usePlayersQuery from '../hooks/usePlayersQuery';
import { ChallongerLocalStorage } from '../interfaces';
import MatchLine from './MatchLine';

interface Props {
  settings: ChallongerLocalStorage;
}

export default function ActiveMatchesView({ settings }: Props): JSX.Element {
  const { data: matchesData } = useMatchesQuery(settings);
  const { data: playersData } = usePlayersQuery(settings);

  return (
    <>
      {matchesData?.map((m) => {
        const p1data = m.match.player1_id
          ? playersData?.get(m.match.player1_id)
          : null;
        const p2data = m.match.player2_id
          ? playersData?.get(m.match.player2_id)
          : null;
        return (
          <MatchLine
            key={m.match.id}
            match={m.match}
            player1={p1data}
            player2={p2data}
          />
        );
      })}
    </>
  );
}
