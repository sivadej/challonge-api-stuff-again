import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useTournamentListQuery from '../hooks/useTournamentListQuery';
import { ChallongerLocalStorage } from '../interfaces';

interface Props {
  settings: ChallongerLocalStorage;
  setSettings: (v: ChallongerLocalStorage) => void;
}

export default function TournamentSelector({
  settings,
  setSettings,
}: Props): JSX.Element {
  const [selected, setSelected] = useState<string>(settings?.tourney?.tourneyName ?? '');
  const { data: tournaments } = useTournamentListQuery(settings);

  const tournamentMenuItems: React.ReactNode[] = [];
  if (tournaments && tournaments.ids.length) {
    tournaments.ids.forEach((tId) => {
      tournamentMenuItems.push(
        <MenuItem value={tournaments.entities[tId].url} key={tId}>
          {tournaments.entities[tId].name}
        </MenuItem>
      );
    });
  }

  const handleChange = (
    e: React.ChangeEvent<{
      value: unknown;
    }>
  ) => {
    if (typeof e.target.value === 'string') {
      setSelected(e.target.value);
      setSettings({
        ...settings,
        tourney: { ...settings.tourney, tourneyName: e.target.value },
      });
    }
  };

  return (
    <>
      <h3>tournmament list</h3>
      {selected}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='tournament-select-label'>Tournament</InputLabel>
          <Select
            labelId='tournament-select-label'
            id='tournament-select'
            value={selected}
            label='Tournament'
            onChange={handleChange}
          >
            {tournamentMenuItems}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
