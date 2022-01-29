import React, { useState, useContext } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AppContext } from '../AppContext';
import useTournamentListQuery from '../hooks/useTournamentListQuery';

export default function TournamentSelector(): JSX.Element {
  const { state, dispatch } = useContext(AppContext);
  const {
    tourney: { tourneyName },
  } = state;
  const [selected, setSelected] = useState<string>(tourneyName);
  const { data: tournaments, isLoading } = useTournamentListQuery(state);

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
      dispatch({
        type: 'CHANGE_TOURNEY_NAME',
        payload: { tourneyName: e.target.value },
      });
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='tournament-select-label'>Tournament Name</InputLabel>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        ) : null}
        <Select
          labelId='tournament-select-label'
          id='tournament-select'
          value={selected}
          label='Tournament'
          onChange={handleChange}
          disabled={isLoading}
        >
          {tournamentMenuItems}
        </Select>
      </FormControl>
    </Box>
  );
}
