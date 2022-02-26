import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProvider } from './AppContext';
import { StationProvider } from './StationContext';
import ActiveMatchesView from './components/ActiveMatchesView';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
// import StationManager from './components/StationManager';
import TournamentSelectorModal from './components/TournamentSelectorModal';

import client from './client';

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <AppProvider>
        <StationProvider>
          {/* <StationManager /> */}
          <TournamentSelectorModal />
          <SettingsModal />
          <Header />
          <ActiveMatchesView />
        </StationProvider>
      </AppProvider>

      {process.env.NODE_ENV === 'development'
        ? <ReactQueryDevtools />
        : null
      }
    </QueryClientProvider>
  );
}
