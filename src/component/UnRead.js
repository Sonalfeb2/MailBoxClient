import { useSelector, useDispatch } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { UpdateData } from "../store/InboxAction";
import ViewMsg from "./ViewMsg";
import { SideBarSliceActions } from "../store/SideBarReducer";
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
  return (
    <Container>
      {viewContent.show
        ? <ViewMsg />
        : <Table>
            <tbody>
              {unreadMsgs.length <= 0
                ? <p>No Messaged Found</p>
                : unreadMsgs.map(msg =>
                    <tr onClick={() => handleViewMsg(msg)} key={msg.id}>
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
