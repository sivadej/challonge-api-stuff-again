import React from 'react';
import { TourneyPath } from '../interfaces';

export default function TourneyConfig(props: {
  tourneyPath: TourneyPath;
  onChange: React.Dispatch<React.SetStateAction<TourneyPath>>;
}): JSX.Element {
  const { tourneyPath, onChange } = props;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange((curr) => ({ ...curr, tourneyName: e.target.value }));
  };

  const handleChangeDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange((curr) => ({ ...curr, domain: e.target.value }));
  };

  return (
    <>
      <h1>tourney config</h1>
      domain:{' '}
      <input
        type='text'
        onBlur={handleChangeDomain}
        defaultValue={tourneyPath.domain}
      />
      tourneyName:{' '}
      <input
        type='text'
        onBlur={handleChangeName}
        defaultValue={tourneyPath.tourneyName}
      />
    </>
  );
}
