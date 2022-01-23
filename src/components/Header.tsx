import React from 'react';
import useTournamentQuery from '../hooks/useTournamentQuery';
import { ChallongerLocalStorage } from '../interfaces';

interface Props {
  settings: ChallongerLocalStorage;
}

export default function Header({ settings }: Props): JSX.Element {
  const { data: tournamentData } = useTournamentQuery(settings);
  const { name, tournament_type } = tournamentData ?? {};

  const tName = name ? name.toUpperCase() : '--';
  const tType = tournament_type ? tournament_type.toUpperCase() : '--';

  return (
    <>
      <h3>{tName}</h3>
      <small>{tType}</small>
    </>
  );
}
