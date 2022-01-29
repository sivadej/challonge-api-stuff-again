import React, { useContext } from 'react';
import useTournamentQuery from '../hooks/useTournamentQuery';
import { AppContext } from '../AppContext';


export default function Header(): JSX.Element {
  const { state } = useContext(AppContext);
  const { data: tournamentData } = useTournamentQuery(state);
  const { name, tournament_type } = tournamentData ?? {};

  const tName = name ? name.toUpperCase() : '--';
  const tType = tournament_type ? tournament_type.toUpperCase() : '--';

  return (
    <>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <h3>{tName}</h3>
      <small>{tType}</small>
    </>
  );
}
