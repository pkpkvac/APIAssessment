import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function DisplayCard(props) {
  const [showDetails, setShowDetails] = useState(false);

  const showDetailHandler = (event) => {
    event.preventDefault();
    setShowDetails((details) => !details);
  };

  if (!props.channel) {
    return null;
  }
  return (
    <Container>
      {!showDetails && (
        <Container>
          <Row>
            <Col>
              <Image
                src={props.channel.thumbnail_url}
                alt='logo'
                height={75}
                width={75}
              />
            </Col>
            <Col>{props.channel.display_name}</Col>
            <Col>
              <Button onClick={showDetailHandler}>Details</Button>
            </Col>
          </Row>
        </Container>
      )}
      {showDetails && (
        <Container>
          <Row>
            <Col className=''>
              <h3 className='text-align-center'>{props.channel.title}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>{props.channel.game_name}</h5>
              <Image
                src={props.channel.thumbnail_url}
                alt='logo'
                height={75}
                width={75}
              />
            </Col>
            <Col>{props.channel.display_name}</Col>
            <Col>{props.channel.broadcaster_login}</Col>
          </Row>
          <Row>
            <Button onClick={showDetailHandler}>Less</Button>
          </Row>
        </Container>
      )}
    </Container>
  );
}
