import { useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DisplayCard from '../components/ui/DisplayCard';
import Row from 'react-bootstrap/Row';

export default function Home() {
  const idInputRef = useRef();
  const formRef = useRef();
  const [foundChannels, setFoundChannels] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [cursor, setCursor] = useState(null);

  const fetchChannels = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(false);

    try {
      const params = [`${idInputRef.current.value}`];

      if (cursor) {
        // only need to worry about one cursor
        params.push(`${cursor}`);
      }

      const response = await fetch(`/api/channel/${params.join('&')}`);

      const dataObj = await response.json();

      const data = dataObj.data.data;
      const cursorVal = dataObj.data.pagination.cursor;

      if (foundChannels) {
        setFoundChannels(foundChannels.concat(data));
      } else {
        setFoundChannels(data);
      }
      setCursor(cursorVal);
    } catch {
      setError(true);
    }
    setIsLoading(false);
  };

  const resetHandler = () => {
    formRef.current.reset();
    setFoundChannels(null);
    setCursor(null);
    setError(false);
    setIsLoading(false);
    return;
  };

  return (
    <Container className='d-flex flex-column '>
      <Row className='justify-content-center'>
        <Form ref={formRef} onSubmit={fetchChannels} className='p-4 w-75'>
          <Form.Group className='mb-3 ' controlId='formChannelSearch'>
            <Form.Label className='m-1 '>Search for a Channel</Form.Label>
            <Form.Control
              type='text'
              placeholder='Channel Name'
              ref={idInputRef}
            />
            <Form.Text className='text-muted m-1'>
              example: coolgamers
            </Form.Text>
          </Form.Group>
          <Button className='m-1' variant='primary' type='submit'>
            Search
          </Button>
          <Button className='m-1' onClick={resetHandler}>
            Clear
          </Button>
        </Form>
      </Row>
      <Row className='justify-content-center'>
        <div className='d-flex justify-content-center align-items-center'>
          {isLoading && <p>Loading...</p>}
          {error && <p>There was an error with the request</p>}
        </div>
        {foundChannels &&
          foundChannels.map((channel) => (
            <DisplayCard key={channel.display_name} channel={channel} />
          ))}
        {foundChannels && (
          <div className='d-flex justify-content-center align-items-center'>
            <Button className='m-1' onClick={fetchChannels}>
              Load more
            </Button>
            <Button className='m-1' onClick={resetHandler}>
              Clear
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
}
