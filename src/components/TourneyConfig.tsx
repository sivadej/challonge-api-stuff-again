import React from 'react';
import { TourneyPath } from '../interfaces';
import TextField from '@material-ui/core/TextField';

export default function TourneyConfig(props: {
  tourneyPath: TourneyPath;
  onChange: React.Dispatch<React.SetStateAction<TourneyPath>>;
}): JSX.Element {
  const { tourneyPath, onChange } = props;

  const handleChangeName = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange((curr) => ({ ...curr, tourneyName: e.target.value }));
  };

  const handleChangeDomain = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange((curr) => ({ ...curr, domain: e.target.value }));
  };

  return (
    <>
      <h1>tourney config</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TextField
          label="Domain"
          variant="outlined"
          size="small"
          defaultValue={tourneyPath.domain}
          inputProps={{
            onBlur: handleChangeDomain,
          }}
        />
        <TextField
          label="Tourney Name"
          variant="outlined"
          size="small"
          defaultValue={tourneyPath.tourneyName}
          inputProps={{
            onBlur: handleChangeName,
          }}
        />
      </div>
    </>
  );
}
