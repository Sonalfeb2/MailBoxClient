import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, UpdateData } from "../store/InboxAction";
import "./Inbox.css";
import { InboxSliceActions } from "../store/inboxRedux";
import ViewMsg from "./ViewMsg";
const Inbox = () => {
  const MsgList = useSelector(state => state.inboxList.list);
  const dispatch = useDispatch();
  const viewContent = useSelector(state => state.inboxList.viewContent);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleViewMsg = async e => {
    {
      !e.read && dispatch(UpdateData(e));
    }
    dispatch(InboxSliceActions.showViewContent(e));
  };
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
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
                  <thead>
                    <th>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="selectAll"
                          onChange={handleSelectAll}
                          
                        /> Select All
                      </div>
                    </th>
                    <th>
                      <Button variant="danger">Delete</Button>
                    </th>
                  </thead>
                  <tbody>
                    {MsgList.map(mail =>
                      <tr
                        key={mail.id}
                        /// unread msg call the function for mark read as true in db
                      >
                        <td>
                          <div class="custom-control custom-checkbox">
                            {isCheckAll
                              ? <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id={mail.id}
                                  checked
                                />
                              : <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id={mail.id}
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
