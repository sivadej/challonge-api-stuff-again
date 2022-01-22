import React from 'react';
import { MatchInfo, ParticipantInfo } from '../interfaces';

const MatchLine = (props: {
  match: MatchInfo;
  player1?: ParticipantInfo | null;
  player2?: ParticipantInfo | null;
}): JSX.Element => {
  const { match, player1, player2 } = props;
  const { round, underway_at, started_at } = match;

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

  return (
    <div>
      <h3>
        Round {roundLabel}: {p1label} vs {p2label} @ {timeFormatted}
      </h3>
      <pre>{JSON.stringify(match, null, 2)}</pre>
    </div>
  );
};

export default MatchLine;
