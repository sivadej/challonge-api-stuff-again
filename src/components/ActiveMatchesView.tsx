import React from 'react';
import useMatchesQuery from '../hooks/useMatchesQuery';
import usePlayersQuery from '../hooks/usePlayersQuery';
import { TourneyPath } from '../interfaces';
import MatchLine from './MatchLine';

export default function ActiveMatchesView(props: {
  tourneyPath: TourneyPath;
}): JSX.Element {
  const { tourneyPath } = props;
  const { domain, tourneyName } = tourneyPath;

  const { data: matchesData } = useMatchesQuery(tourneyPath);
  const { data: playersData } = usePlayersQuery(tourneyPath);

  return (
    <>
      <h1>
        matches {domain} {tourneyName}
      </h1>
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
