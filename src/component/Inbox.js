import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, UpdateData } from "../store/InboxAction";
import "./Inbox.css";
import { InboxSliceActions } from "../store/inboxRedux";
import ViewMsg from "./ViewMsg";
import { CheckBoxReducerAction } from "../store/CheckBoxReducer";
const Inbox = () => {
  const MsgList = useSelector(state => state.inboxList.list);

  const viewContent = useSelector(state => state.inboxList.viewContent);
  const checkedStore = useSelector(state => state.checkInboxMsg.checked);
  const dispatch = useDispatch();
  const isCheckAll = useSelector(state => state.checkInboxMsg.isCheckAll);
  const handleViewMsg = async e => {
    {
      !e.read && dispatch(UpdateData(e));
    }
    dispatch(InboxSliceActions.showViewContent(e));
  };
  const handleSelectAll = e => {
    dispatch(
      CheckBoxReducerAction.handleCheckedAll({
        checked: e.target.checked,
        list: MsgList
      })
    );
  };
  useEffect(
    () => {
      dispatch(fetchData());
    },
    [dispatch]
  );
  const handleChecked = e => {
    dispatch(
      CheckBoxReducerAction.handleChecked({
        id: e.target.id,
        checked: e.target.checked
      })
    );
  };
const handleDelete = async() =>{
  console.log(checkedStore)

}
  return (
    <Container fluid="md">
      {viewContent.show
        ? <ViewMsg />
        : <Container>
            {MsgList.length <= 0
              ? <p>No Messaged Found</p>
              : <Table>
                  <thead>
                    <th>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="selectAll"
                          onChange={e => handleSelectAll(e)}
                        />{" "}
                        Select All
                      </div>
                    </th>
                    <th>
                      <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </th>
                  </thead>
                  <tbody>
                    {MsgList.map(mail =>
                      <tr
                        key={mail.id}
                        /// unread msg call the function for mark read as true in db
                      >
                        <td>
                          <div className="custom-control custom-checkbox">
                            {isCheckAll
                              ? <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={mail.id}
                                  checked
                                />
                              : <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={mail.id}
                                  onChange={e => handleChecked(e)}
                                />}
                          </div>
                        </td>
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
                          {new Date(mail.date).getDate() +
                            "/" +
                            new Date(mail.date).getMonth() +
                            "/" +
                            new Date(mail.date).getFullYear() +
                            "/"}
                          -{" "}
                          {new Date(mail.date).getHours() +
                            ":" +
                            new Date(mail.date).getMinutes()}
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
