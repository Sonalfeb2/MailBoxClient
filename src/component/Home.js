import { ListGroup, Row, Col, Container, Badge } from "react-bootstrap";
import EmailEditor from "./EmailEditor";
import { useState } from "react";
import Inbox from "./Inbox";
import { useDispatch, useSelector } from "react-redux";
import Unread from "./UnRead";
import SentMail from "./SentMail";
import { SideBarSliceActions } from "../store/SideBarReducer";
const Home = () => {
  const [show, setShow] = useState({
    inbox: true
  });
  const inboxLength = useSelector(state => state.inboxList.totalMsg);
  const unreadLength = useSelector(state => state.inboxList.unread);
  const sideBarList = useSelector(state => state.sideBarList.sideBarList);
  const dispatch = useDispatch();
  const handleUpdate = list => {
    const name = list.name;
    setShow({ [name]: true });
    dispatch(SideBarSliceActions.updatedSideBarList({ name: list.name }));
  };
  return (
    <Container>
      Welcome to Mail Box -
      <Row>
        <Col md={2}>
          <ListGroup as="ul">
            {sideBarList.map((list, index) =>
              <ListGroup.Item
                key={index}
                as="li"
                active={list.show ? true : false}
                onClick={() => handleUpdate(list)}
              >
                {list.name}
                <Badge pill bg="primary">
                  {list.name === "inbox" && inboxLength}
                  {list.name === "unread" && unreadLength}
                </Badge>
              </ListGroup.Item>
             
            )}
          </ListGroup>
        </Col>
        <Col>
          {show.email && <EmailEditor />}
          {show.inbox && <Inbox />}
          {show.unread && <Unread />}
          {show.sentbox && <SentMail/>}
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
