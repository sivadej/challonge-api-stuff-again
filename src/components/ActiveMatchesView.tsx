import React, { useContext } from 'react';
import useMatchesQuery from '../hooks/useMatchesQuery';
import usePlayersQuery from '../hooks/usePlayersQuery';
import MatchLine from './MatchLine';
import { AppContext } from '../AppContext';

export default function ActiveMatchesView(): JSX.Element {
  const { state: settings } = useContext(AppContext);
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
            settings={settings}
          />
        );
      })}
    </>
  );
}
