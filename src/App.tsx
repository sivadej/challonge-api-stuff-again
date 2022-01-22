import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TourneyPath } from './interfaces';
import TourneyConfig from './components/TourneyConfig';
import ActiveMatchesView from './components/ActiveMatchesView';

const client = new QueryClient();

export default function App(): JSX.Element {
  const [tourneyPath, setTourneyPath] = useState<TourneyPath>({
    domain: 'akg',
    tourneyName: 'test1030',
  });

  return (
    <QueryClientProvider client={client}>
      <TourneyConfig tourneyPath={tourneyPath} onChange={setTourneyPath} />
      <ActiveMatchesView tourneyPath={tourneyPath} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
