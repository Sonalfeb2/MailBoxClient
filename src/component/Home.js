import { ListGroup, Row, Col, Container, Badge } from "react-bootstrap";
import EmailEditor from "./EmailEditor";
import { useState } from "react";
import Inbox from "./Inbox";
import { useSelector } from "react-redux";
const Home = () => {
  const [show, setShow] = useState({
    email: false,
    inbox: true,
    unread: false,
  });
  const inboxLength = useSelector(state => state.inboxList.totalMsg);
  const unreadLength = useSelector(state=>state.inboxList.unread)
  return (
    <Container>
      Welcome to Mail Box -
      <Row>
        <Col md={2}>
          <ListGroup as="ul">
            <ListGroup.Item
              as="li"
              active={show.email ? true : false}
              onClick={() => setShow((prev)=>({email:true,unread:false, inbox: false}))}
            >
              Compose
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              active={show.inbox ? true : false}
              onClick={() => setShow((prev)=>({email:false,unread:false, inbox: true}))}
            >
              Inbox
              <Badge pill bg="primary">
                {inboxLength}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              active={show.unread ? true : false}
              onClick={() => setShow({email:false,unread:true, inbox: false})}
            >
              Unread
              <Badge pill bg="secondary">
                {unreadLength}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          {show.email && <EmailEditor />}
          {show.inbox && <Inbox />}
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
