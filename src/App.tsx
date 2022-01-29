import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProvider } from './AppContext';
import ActiveMatchesView from './components/ActiveMatchesView';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import TournamentSelector from './components/TournamentSelector';
import TourneyConfig from './components/TournamentConfig';

// React Query Client
import client from './client';
import TournamentSelectorModal from './components/TournamentSelectorModal';

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <AppProvider>
        <TournamentSelectorModal />
        <SettingsModal />
        <Header />
        <ActiveMatchesView />
        {/* <ReactQueryDevtools /> */}
      </AppProvider>
    </QueryClientProvider>
  );
}
