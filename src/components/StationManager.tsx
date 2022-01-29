import React, { useContext, useState } from 'react';
import { StationContext } from '../StationContext';
import { StationActionTypes as StActions } from '../interfaces';

export default function StationManager(): JSX.Element {
  const { state: stations, dispatch } = useContext(StationContext);
  const [sNameInput, setSNameInput] = useState<string>('');

  return (
    <>
      <pre>{JSON.stringify(stations, null, 2)}</pre>
      <input
        type='text'
        value={sNameInput}
        onChange={(e) => setSNameInput(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch({
            type: StActions.addStation,
            payload: { stationName: sNameInput },
          })
        }
      >
        add new station
      </button>
      <button
        onClick={() =>
          dispatch({
            type: StActions.assignMatchToStation,
            payload: {
              stationName: '1',
              matchId: Math.ceil(Math.random() * 100000000),
            },
          })
        }
      >
        ASSIGN_MATCH_TO_STATION
      </button>
      <button
        onClick={() =>
          dispatch({
            type: StActions.fillAvailableStations,
          })
        }
      >
        Fill stations
      </button>
    </>
  );
}
