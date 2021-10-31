import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { Formik, Field, FormikProvider } from 'formik';

const initSubdomain: string = 'akg';
const initTourneyName: string = 'test1030';

interface FormValues {
  sub: string;
  tourney: string;
}

const initialValues: FormValues = {
  sub: initSubdomain,
  tourney: initTourneyName,
}

const client = new QueryClient();

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <Bomby />
    </QueryClientProvider>
  )
}

function Bomby(): JSX.Element {
  const [subdomain, setSubdomain] = useState<string>(initSubdomain);
  const [tourneyName, setTourneyName] = useState<string>(initTourneyName);

  const { data: playerQuery } = useQuery(
    `${tourneyName}players`,
    async () => {
      const res = await axios.get(
        `https://api.challonge.com/v1/tournaments/${subdomain}-${tourneyName}/participants.json?api_key=${process.env.REACT_APP_CHALLONGE_API_KEY}`
      );
      return res.data as { participant: Participant }[];
    });
  const { data: matchQuery } = useQuery(
    `${tourneyName}matches`,
    async () => {
      const res = await axios.get(
        `https://api.challonge.com/v1/tournaments/${subdomain}-${tourneyName}/matches.json?api_key=${process.env.REACT_APP_CHALLONGE_API_KEY}`
      );
      return res.data as { match: Match }[];
    });

  const players = useMemo<Map<number, Participant>>(() => {
    const playerMap = new Map<number, Participant>();
    if (playerQuery && playerQuery.length) {
      for (const p of playerQuery) {
        playerMap.set(p.participant.id, p.participant);
      }
    }
    return playerMap;
  }, [playerQuery]);

  const activeMatches = matchQuery?.filter(m => !!m.match.underway_at) ?? [];

  return (
    <>
      active matches:
      {subdomain}
      {tourneyName}
      <pre>
        {activeMatches?.map(m => {
          const { match } = m;
          const { player1_id, player2_id, round } = match;
          const p1 = players.get(player1_id);
          const p2 = players.get(player2_id);
          return (<div><h3>
            Round {round}: {p1?.name} vs {p2?.name}
          </h3></div>
          );
        })}
      </pre>


      <Formik
        onSubmit={() => { }}
        initialValues={initialValues}
      >
        {({ values }) => {
          return <>
            <Field type="text" name="sub" />
            <Field type="text" name="tourney" />
            <button
              type="button"
              onClick={() => {
                setSubdomain(values.sub);
                setTourneyName(values.tourney);
              }}
            >set</button>
          </>
        }}
      </Formik>



      {process.env.NODE_ENV}
    </>
  );
}

interface Match {
  id: number;
  state: string;
  player1_id: number;
  player2_id: number;
  round: number;
  underway_at: string | null;
}

interface Participant {
  id: number;
  name: string;
}
