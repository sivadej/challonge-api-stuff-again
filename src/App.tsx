import React from 'react';
import client from './client';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import useSettingsLocalStorage from './hooks/useSettingsLocalStorage';
import TourneyConfig from './components/TourneyConfig';
import ActiveMatchesView from './components/ActiveMatchesView';
import Header from './components/Header';
import TournamentSelector from './components/TournamentSelector';

export default function App(): JSX.Element {
  const [settings, setSettings] = useSettingsLocalStorage();

  return (
    <QueryClientProvider client={client}>
      <TournamentSelector settings={settings} setSettings={setSettings} />
      <Header settings={settings} />
      <TourneyConfig settings={settings} setSettings={setSettings} />
      <ActiveMatchesView settings={settings} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
