import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UpdateData } from "../store/inbox-action";
import "./Inbox.css";
import ViewMsg from "./ViewMsg";
import { SideBarSliceActions } from "../store/sidebar-reducer";
import { DateTime } from "luxon";
import 'font-awesome/css/font-awesome.min.css';

const Inbox = () => {
  const msgList = useSelector(state => state.inboxList.list);
  const viewContent = useSelector(state => state.sideBarList.viewContent);
  const dispatch = useDispatch();
  const handleViewMsg = async e => {
    {
      !e.read && dispatch(UpdateData(e));
    }
    dispatch(SideBarSliceActions.showViewContent(e));
  };

  const handleDelete = async e => {
    const res = await fetch(
      `https://mail-box-80520-default-rtdb.firebaseio.com/receivers/${e}.json`,
      {
        method: "DELETE"
      }
    );
    await res.json();

  };
  return (
    <Container fluid="md">
      {viewContent.show
        ? <ViewMsg />
        : <Container>
            {msgList.length <= 0
              ? <p>No Messaged Found</p>
              : <Table>
                  <tbody>
                    {msgList.map(mail =>
                      <tr
                        key={mail.id}
                        /// unread msg call the function for mark read as true in db
                      >
                        <td>
                          {!mail.read && <div className="dot" />}
                        </td>
                        <td>
                          {mail.from.split("@")[0]}
                        </td>
                        <td onClick={() => handleViewMsg(mail)}>
                          {mail.subject}
                        </td>
                        <td>
                          {mail.content}
                        </td>
                        <td>
                          {DateTime.fromISO(mail.date).toFormat(
                            "MMMM dd, yyyy"
                          )}
                        </td>
                        <td>
                          <Button
                            variant="secondary"
                            onClick={() => handleDelete(mail.id)}
                          >
                            <i className="fa fa-duotone fa-trash"></i>
                          </Button>
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
