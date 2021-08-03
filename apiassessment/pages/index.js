import styles from '../styles/Home.module.css';
import { useRef, useState } from 'react';
import Channel from '../components/channel';
export default function Home() {
  const idInputRef = useRef();
  const formRef = useRef();
  const [foundChannel, setFoundChannel] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const fetchChannels = async (event) => {
    setIsLoading(true);

    event.preventDefault();

    try {
      const response = await fetch(`/api/channel/${idInputRef.current.value}`);

      const dataObj = await response.json();

      const data = dataObj.data;
      console.log(data.game_name);

      setFoundChannel(data);

      formRef.current.reset();
    } catch {
      setError(true);
    }
    setIsLoading(false);
  };

  const resetHandler = () => {
    formRef.current.reset();
    setFoundChannel(null);
    setError(false);
    return;
  };

  return (
    <div className={styles.container}>
      Search for a channel ID, e.g: 141981764
      <form ref={formRef}>
        <label>
          <input
            ref={idInputRef}
            type='text'
            placeholder='Search for channel ID'
          />
        </label>
        <button onClick={fetchChannels}>Search for Channel</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>There was an error with the request</p>}
      <Channel info={foundChannel} />
      <button onClick={resetHandler}>Clear</button>
    </div>
  );
}
