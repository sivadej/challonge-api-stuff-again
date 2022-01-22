import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import TourneyConfig from './components/TourneyConfig';
import ActiveMatchesView from './components/ActiveMatchesView';
import useSettingsLocalStorage from './hooks/useSettingsLocalStorage';

const client = new QueryClient();

export default function App(): JSX.Element {
  const [settings, setSettings] = useSettingsLocalStorage();
  return (
    <QueryClientProvider client={client}>
      <TourneyConfig settings={settings} setSettings={setSettings} />
      <ActiveMatchesView settings={settings} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
