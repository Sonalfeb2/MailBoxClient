import {
  ListGroup,
  Row,
  Col,
  Container,
  Badge,
  ListGroupItem
} from "react-bootstrap";
import EmailEditor from "./EmailEditor";
import { useState } from "react";
import Inbox from "./Inbox";
import { useDispatch, useSelector } from "react-redux";
import Unread from "./UnRead";
import SentMail from "./SentMail";
import { SideBarSliceActions } from "../store/sidebar-reducer";
const Home = () => {
  const [show, setShow] = useState({
    Inbox: true
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
    <Container style={{height:'100vh'}}>
      <Row className="h-100">
        <Col md={2}>
          <ListGroup as="ul" className="h-100">
            {sideBarList.map((list, index) =>
              <ListGroup.Item
                className="d-flex justify-content-between align-items-start "
                key={index}
                as="li"
                active={list.show ? true : false}
                onClick={() => handleUpdate(list)}
              >
                <div className="ms-2 me-auto">
                  {list.name}
                </div>

                <Badge pill bg="secondary">
                  {list.name === "Inbox" && inboxLength}
                  {list.name === "Unread" && unreadLength}
                </Badge>
              </ListGroup.Item>
            )}
            <ListGroupItem className="h-100" />
          </ListGroup>
        </Col>
        <Col>
          {show.Compose && <EmailEditor />}
          {show.Inbox && <Inbox />}
          {show.Unread && <Unread />}
          {show.Sentbox && <SentMail />}
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
