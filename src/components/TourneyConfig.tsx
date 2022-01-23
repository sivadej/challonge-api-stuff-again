import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ChallongerLocalStorage } from '../interfaces';
import useTournamentQuery from '../hooks/useTournamentQuery';

interface Props {
  settings: ChallongerLocalStorage;
  setSettings: (v: ChallongerLocalStorage) => void;
}

export default function TourneyConfig({ settings, setSettings }: Props): JSX.Element {
  const { config, tourney } = settings ?? {};
  const { domain, tourneyName } = tourney ?? {};
  const { challongeKey } = config ?? {};

  const { data: tournamentData } = useTournamentQuery(settings);
  const { name } = tournamentData ?? {};

  const handleChangeKey = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (challongeKey !== e.target.value) {
      setSettings({...settings, config: { challongeKey: e.target.value } })
    }
  };

  const handleChangeName = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (tourneyName !== e.target.value) {
      setSettings({...settings, tourney: { ...settings.tourney, tourneyName: e.target.value} })
    }
  };

  const handleChangeDomain = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (domain !== e.target.value) {
      setSettings({...settings, tourney: { ...settings.tourney, domain: e.target.value} })
    }
  };

  return (
    <>
      {name}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TextField
          label="Challonge API Key"
          type="password"
          variant="outlined"
          size="small"
          defaultValue={challongeKey ?? ''}
          inputProps={{
            onBlur: handleChangeKey,
          }}
        />
        <TextField
          label="Domain"
          variant="outlined"
          size="small"
          defaultValue={domain}
          inputProps={{
            onBlur: handleChangeDomain,
          }}
        />
        <TextField
          label="Tourney Name"
          variant="outlined"
          size="small"
          defaultValue={tourneyName}
          inputProps={{
            onBlur: handleChangeName,
          }}
        />
      </div>
    </>
  );
}
