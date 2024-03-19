import { useSelector, useDispatch } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { UpdateData } from "../store/InboxAction";
import { InboxSliceActions } from "../store/inboxRedux";
import ViewMsg from "./ViewMsg";
const Unread = () => {
  const dispatch = useDispatch();
  const unreadMsgs = useSelector(state => state.inboxList.unreadList);
  const viewContent = useSelector(state => state.inboxList.viewContent);
  const handleViewMsg = e => {
    {
      !e.read && dispatch(UpdateData(e));
    }
    dispatch(InboxSliceActions.showViewContent(e));
  };
  return (
    <Container>
      {viewContent.show
        ? <ViewMsg />
        : <Table>
            <tbody>
              {unreadMsgs.length > 0 &&
                unreadMsgs.map(msg =>
                  <tr onClick={() => handleViewMsg(msg)}>
                    <td>
                      {msg.from.split("@")[0]}
                    </td>
                    <td>
                      {msg.subject}
                    </td>
                    <td>
                      {msg.content}
                    </td>
                  </tr>
                )}
            </tbody>
          </Table>}
    </Container>
  );
};
export default Unread;
