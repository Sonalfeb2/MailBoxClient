import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, UpdateData } from "../store/InboxAction";
import "./Inbox.css";
import { InboxSliceActions } from "../store/inboxRedux";
import ViewMsg from "./ViewMsg";
const Inbox = () => {
  const MsgList = useSelector(state => state.inboxList.list);
  const dispatch = useDispatch();
  const viewContent = useSelector(state => state.inboxList.viewContent);
  const handleViewMsg = async e => {
    {
      !e.read && dispatch(UpdateData(e));
    }
    dispatch(InboxSliceActions.showViewContent(e));
  };
  useEffect(
    () => {
      dispatch(fetchData());
    },
    [dispatch]
  );

  return (
    <Container fluid="md">
      {viewContent.show
        ? <ViewMsg />
        : <Container>
            {MsgList.length <= 0
              ? <p>No Messaged Found</p>
              : <Table>
                  <tbody>
                    {MsgList.map(mail =>
                      <tr
                        key={mail.id}
                        onClick={() => handleViewMsg(mail)} /// unread msg call the function for mark read as true in db
                      >
                        <td>
                          {!mail.read && <div className="dot" />}
                        </td>
                        <td>
                          {mail.from.split("@")[0]}
                        </td>
                        <td>
                          {mail.subject}
                        </td>
                        <td>
                          {mail.content}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>}
          </Container>}
    </Container>
  );
};
export default Inbox;
