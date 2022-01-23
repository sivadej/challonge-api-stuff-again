import React from 'react';
import { useQueryClient } from 'react-query';
import { PlayerMap } from '../interfaces';

// playing around with direct cache reads
export default function DumbDumb(): JSX.Element {
  const client = useQueryClient();
  
  const handleClick = async () => {
    const data = await client.getQueryData<PlayerMap>(['playerList', 'akg-exso763']);
    console.log(data);
    if (data) console.log(data.get(117770546));
  }

  return (
    <>
      <button onClick={handleClick}>dumbdumb</button>
    </>
  );
}
