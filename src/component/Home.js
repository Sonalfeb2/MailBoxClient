import { ListGroup, Row, Col, Container, Badge } from "react-bootstrap";
import EmailEditor from "./EmailEditor";
import { useState } from "react";
import Inbox from "./Inbox";
import { useDispatch, useSelector } from "react-redux";
import { InboxSliceActions } from "../store/inboxRedux";
const Home = () => {
  const [show, setShow] = useState({
    inbox:true
  });
  const inboxLength = useSelector(state => state.inboxList.totalMsg);
  const unreadLength = useSelector(state=>state.inboxList.unread);
  const sideBarList = useSelector(state =>state.inboxList.sideBarList);
  console.log(sideBarList)
  const dispatch = useDispatch();
  const handleUpdate = (list) =>{
      const name = list.name
      setShow({[name]:true})
    dispatch(InboxSliceActions.updatedSideBarList({name : list.name}))
  }
  return (
    <Container>
      Welcome to Mail Box -
      <Row>
        <Col md={2}>
          <ListGroup as="ul">
            {sideBarList.map(list=><ListGroup.Item
              as="li"
              active={list.show ? true : false}
              onClick={() =>handleUpdate(list)}
            >
              {list.name} 
              <Badge pill bg="primary">
                {list.name==='inbox' && inboxLength}
                {list.name==='unread' && unreadLength}
              </Badge>
            </ListGroup.Item>)}
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
