import React from 'react';
import { MatchInfo, ParticipantInfo } from '../interfaces';
import useUpdateMatchMutation from '../hooks/useUpdateMatchMutation';
import Button from '@material-ui/core/Button';
import { useQueryClient } from 'react-query';

const MatchLine = (props: {
  match: MatchInfo;
  player1?: ParticipantInfo | null;
  player2?: ParticipantInfo | null;
}): JSX.Element => {
  const client = useQueryClient();
  const { match, player1, player2 } = props;
  const { id: matchId, round, underway_at, started_at, scores_csv, completed_at, state } =
    match;

  const timeFormatted =
    underway_at || started_at
      ? new Date(underway_at ?? started_at ?? '').toLocaleTimeString()
      : '--/--/-- --:--:--';
  const p1name = player1?.name ?? '--';
  const p2name = player2?.name ?? '--';

  const roundLabel = round > 0 ? `W${round}` : `L${Math.abs(round)}`;

  const getPlayerMatchResultColor = (
    pId?: number | null
  ): string | undefined => {
    if (match.loser_id === pId) return 'darkred';
    if (match.winner_id === pId) return 'green';
    return undefined;
  };

  const p1label = (
    <span style={{ color: getPlayerMatchResultColor(player1?.id) }}>
      {p1name}
    </span>
  );
  const p2label = (
    <span style={{ color: getPlayerMatchResultColor(player2?.id) }}>
      {p2name}
    </span>
  );

  const { mutate: updateMatch } = useUpdateMatchMutation();
  const handleClickWin = (playerId?: number | null) => {
    if (!playerId) return;
    updateMatch({matchId, playerId}, {
      onSuccess: () => {
        client.invalidateQueries(["akg-test1030","matches"]);
      }
    });
  }

  return (
    <div>
      <h3>
        Round {roundLabel}: {p1label} vs {p2label} | started @ {timeFormatted}
      </h3>
      <div>
        {state === 'complete' && completed_at ? (
          <>
            completed: {new Date(completed_at).toLocaleTimeString()}{' '}
            {scores_csv ? `[${scores_csv}]` : ''}
            <Button variant="outlined">edit</Button>
          </>
        ) : null}

        {state === 'open' ? (
          <>
            <Button variant="contained" onClick={() => handleClickWin(player1?.id)}>P1 WIN</Button>
            <Button variant="contained" onClick={() => handleClickWin(player2?.id)}>P2 WIN</Button>
          </>
        ) : null}
      </div>
      {/* <pre>{JSON.stringify(match, null, 2)}</pre> */}
    </div>
  );
};

export default MatchLine;
