import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TourneyPath } from './interfaces';
import TourneyConfig from './components/TourneyConfig';
import ActiveMatchesView from './components/ActiveMatchesView';
// import useLocalStorage from './hooks/useLocalStorage';

const client = new QueryClient();

export default function App(): JSX.Element {
  const [tourneyPath, setTourneyPath] = useState<TourneyPath>({
    domain: 'akg',
    tourneyName: 'test1030',
  });

  // const [thing, setThing] = useLocalStorage<string | null>(
  //   'challonger-thing',
  //   null
  // );

  return (
    <QueryClientProvider client={client}>
      {/* <h1>{thing}</h1>
      <button onClick={() => setThing('changed the thing')}>
        change the thing
      </button> */}
      <TourneyConfig tourneyPath={tourneyPath} onChange={setTourneyPath} />
      <ActiveMatchesView tourneyPath={tourneyPath} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
