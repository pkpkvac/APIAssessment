import { useState } from 'react';

export default function Channel(props) {
  const [viewInfo, setViewInfo] = useState(false);

  const toggleInfoHandler = () => {
    setViewInfo((status) => !status);
  };

  if (!props.info) {
    return null;
  }

  return (
    <div>
      <p>
        {props.info.broadcaster_name} ({props.info.channel})
      </p>
      {viewInfo && <p>{props.info.game_name}</p>}
      {viewInfo && <p>{props.info.title}</p>}
      <button onClick={toggleInfoHandler}>
        {viewInfo ? 'Less Info' : 'More Info'}
      </button>
    </div>
  );
}
