import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import useTournamentQuery from '../hooks/useTournamentQuery';
import { AppContext } from '../AppContext';

export default function TournamentConfig(): JSX.Element {
  const { state: settings, dispatch } = useContext(AppContext);
  const {
    config: { challongeKey },
    tourney: { domain },
  } = settings;
  useTournamentQuery(settings);

  const handleChangeKey = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (challongeKey !== e.target.value) {
      dispatch({ type: 'CHANGE_API_KEY', payload: { challongeKey: e.target.value } });
    }
  };

  const handleChangeDomain = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (domain !== e.target.value) {
      dispatch({ type: 'CHANGE_DOMAIN', payload: { domain: e.target.value } });
    }
  };

  useEffect(() => {
    dispatch({ type: 'CHANGE_API_KEY', payload: { challongeKey } });
  }, [challongeKey, dispatch])

  useEffect(() => {
    dispatch({ type: 'CHANGE_DOMAIN', payload: { domain } });
  }, [domain, dispatch])

  return (
    <>
      <TextField
          label='Domain'
          variant='outlined'
          size='small'
          defaultValue={domain}
          inputProps={{
            onBlur: handleChangeDomain,
          }}
        />
      <TextField
          label='Challonge API Key'
          type='password'
          variant='outlined'
          size='small'
          defaultValue={challongeKey}
          inputProps={{
            onBlur: handleChangeKey,
          }}
        />
    </>
  );
}
