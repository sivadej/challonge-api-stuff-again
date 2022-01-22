import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ChallongerLocalStorage } from '../interfaces';

interface Props {
  settings: ChallongerLocalStorage;
  setSettings: (v: ChallongerLocalStorage) => void;
}

export default function TourneyConfig({ settings, setSettings }: Props): JSX.Element {
  const { config, tourney } = settings || {};
  const { domain, tourneyName } = tourney || {};
  const { challongeKey } = config || {};

  const handleChangeKey = (e: React.FocusEvent<HTMLInputElement>) => {
    if (challongeKey !== e.target.value) {
      setSettings({...settings, config: { challongeKey: e.target.value } })
    }
  };

  const handleChangeName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (tourneyName !== e.target.value) {
      setSettings({...settings, tourney: { ...settings.tourney, tourneyName: e.target.value} })
    }
  };

  const handleChangeDomain = (e: React.FocusEvent<HTMLInputElement>) => {
    if (domain !== e.target.value) {
      setSettings({...settings, tourney: { ...settings.tourney, domain: e.target.value} })
    }
  };

  return (
    <>
      <h1>tourney config</h1>
      {JSON.stringify(settings, null, 2)}
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
