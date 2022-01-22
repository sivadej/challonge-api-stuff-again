import React, { useMemo, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Field, FormikProvider, useFormik } from 'formik';
import { TourneyPath } from './interfaces';
import TourneyConfig from './components/TourneyConfig';
import ActiveMatchesView from './components/ActiveMatchesView';

const initTourney: TourneyPath = { domain: 'akg', tourneyName: 'test1030' };

const client = new QueryClient();

export default function App(): JSX.Element {
  // store tourney path values here
  const [tourneyPath, setTourneyPath] = useState<TourneyPath>(initTourney);

  return (
    <QueryClientProvider client={client}>
      {JSON.stringify(tourneyPath, null, 2)}
      <TourneyConfig tourneyPath={tourneyPath} onChange={setTourneyPath} />
      <ActiveMatchesView tourneyPath={tourneyPath} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

// function ActiveMatchesOLD(): JSX.Element {
//   const [tourneyPath, setTourneyPath] = useState<TourneyPath>(initTourney);
//   const { name: tourneyName, domain: subdomain } = tourneyPath;

//   const formik = useFormik<FormValues>({
//     onSubmit: () => {},
//     initialValues: { sub: subdomain, tourney: tourneyName },
//   });
//   const { values } = formik;

//   const { data: playerQuery, isError: playerDataError } = useQuery(
//     `${subdomain}${tourneyName}players`,
//     async () => {
//       const { data }: AxiosResponse<Participants[]> = await axios.get(
//         `https://api.challonge.com/v1/tournaments/${subdomain}-${tourneyName}/` +
//           `participants.json?api_key=${process.env.REACT_APP_CHALLONGE_API_KEY}`
//       );
//       return data;
//     }
//   );
//   const {
//     data: matchQuery,
//     isError: matchDataError,
//     isRefetching,
//   } = useQuery(
//     `${subdomain}${tourneyName}matches`,
//     async () => {
//       const { data }: AxiosResponse<Matches[]> = await axios.get(
//         `https://api.challonge.com/v1/tournaments/${subdomain}-${tourneyName}/matches.json?api_key=${process.env.REACT_APP_CHALLONGE_API_KEY}`
//       );
//       return data;
//     },
//     {
//       refetchInterval: 20000,
//       refetchIntervalInBackground: false,
//     }
//   );

//   const players = useMemo<Map<number, Participant>>(() => {
//     console.log('memoizing player data');
//     const playerMap = new Map<number, Participant>();
//     if (playerQuery && playerQuery.length) {
//       for (const p of playerQuery) {
//         playerMap.set(p.participant.id, p.participant);
//       }
//     }
//     console.log(playerMap);
//     return playerMap;
//   }, [playerQuery]);

//   const activeMatches = matchQuery?.filter((m) => !!m.match.underway_at) ?? [];

//   if (playerDataError || matchDataError) return <>error</>;

//   const MainForm = (): JSX.Element => (
//     <FormikProvider value={formik}>
//       <Field type='text' name='sub' />
//       <Field type='text' name='tourney' />
//       <button
//         type='button'
//         onClick={() => {
//           setTourneyPath({ domain: values.sub, name: values.tourney });
//         }}
//       >
//         set
//       </button>
//     </FormikProvider>
//   );

//   return (
//     <>
//       <pre>{JSON.stringify(tourneyPath, null, 2)}</pre>
//       <div style={{ backgroundColor: isRefetching ? 'yellow' : 'green' }}>
//         ya
//       </div>
//       active matches:
//       {subdomain}
//       {tourneyName}
//       <pre>
//         {activeMatches?.map((m) => (
//           <MatchLine match={m.match} key={m.match.id} players={players} />
//         ))}
//       </pre>
//       <MainForm />
//     </>
//   );
// }

// const MatchLine = (props: {
//   match: Match;
//   players: Map<number, Participant>;
// }): JSX.Element => {
//   const { match, players } = props;
//   const { player1_id, player2_id, round, underway_at } = match;

//   const time = new Date(underway_at ?? '').toLocaleTimeString();
//   const p1name = players.get(player1_id)?.name ?? '--';
//   const p2name = players.get(player2_id)?.name ?? '--';

//   return (
//     <div>
//       <h3>
//         Round {round}: {p1name} vs {p2name}
//         {time}
//       </h3>
//     </div>
//   );
// };
