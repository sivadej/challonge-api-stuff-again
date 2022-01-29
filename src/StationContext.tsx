import React, { createContext, useReducer } from 'react';
import {
  StationState,
  StationReducerActions,
  StationActionTypes,
} from './interfaces';
import produce from 'immer';

const initialState: StationState = {
  stations: [],
};

const StationContext = createContext<{
  state: StationState;
  dispatch: React.Dispatch<StationReducerActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (
  state: StationState,
  action: StationReducerActions
): StationState => {
  switch (action.type) {
    case StationActionTypes.addStation:
      if (!!state.stations.find((s) => s.id === action.payload.stationName)) {
        return state;
      }
      return produce(state, (draft) => {
        draft.stations.push({
          currentMatch: null,
          id: action.payload.stationName,
          queue: [],
        });
      });

    case StationActionTypes.assignMatchToStation:
      const i = state.stations.findIndex(
        (s) => s.id === action.payload.stationName
      );
      if (i === -1) return state;
      return produce(state, (draft) => {
        if (draft.stations[i].currentMatch === null) {
          draft.stations[i].currentMatch = action.payload.matchId;
        } else {
          draft.stations[i].queue.push(action.payload.matchId);
        }
      });

    case StationActionTypes.fillAvailableStations:
      return state;

    default:
      return state;
  }
};

const StationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('station state', JSON.stringify(state, null, 2));

  return (
    <StationContext.Provider value={{ state, dispatch }}>
      {children}
    </StationContext.Provider>
  );
};

export { StationContext, StationProvider };
