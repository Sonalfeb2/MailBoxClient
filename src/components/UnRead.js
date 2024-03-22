import { useSelector, useDispatch } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { UpdateData } from "../store/inbox-action";
import ViewMsg from "./ViewMsg";
import { SideBarSliceActions } from "../store/sidebar-reducer";
import { DateTime } from "luxon";

const Unread = () => {
  const dispatch = useDispatch();
  const unreadMsgs = useSelector(state => state.inboxList.unreadList);
  const viewContent = useSelector(state => state.sideBarList.viewContent);
  const handleViewMsg = e => {
    {
      !e.read && dispatch(UpdateData(e));
    }
    dispatch(SideBarSliceActions.showViewContent(e));
  };
  console.log(unreadMsgs);
  return (
    <Container>
      {viewContent.show
        ? <ViewMsg />
        : <Table>
            <tbody>
              {unreadMsgs.length <= 0
                ? <tr><td>No Unread Messages</td></tr>
                : unreadMsgs.map(msg =>
                    <tr onClick={() => handleViewMsg(msg)} key={msg.id}>
                      <td>
                        {msg.to.split("@")[0]}
                      </td>
                      <td>
                        {msg.subject}
                      </td>
                      <td>
                        {msg.content}
                      </td>
                      <td>
                        {DateTime.fromISO(msg.date).toFormat("MMMM dd, yyyy")}
                      </td>
                    </tr>
                  )}
            </tbody>
          </Table>}
    </Container>
  );
};
export default Unread;
