import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { InboxSliceActions } from "../store/inboxRedux";
import { useDispatch, useSelector } from "react-redux";
import "./Inbox.css";
const Inbox = () => {
  const userEmail = localStorage.getItem("userEmail");
  const MsgList = useSelector(state => state.inboxList.list);

  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);
  const [viewMsg, setView] = useState(null);
  const getdata = async () => {
    const arr = [];
    const res = await fetch(
      `https://mailbox-client-41b43-default-rtdb.firebaseio.com/mails.json?orderBy="to"&startAt="${userEmail}"&endAt="${userEmail}"`
    );
    const data = await res.json();
    if (data.error) {
      setNotFound(true);
    } else {
      for (let [key, value] of Object.entries(data)) {
        arr.push({ ...value, id: key });
      }
      dispatch(InboxSliceActions.getList(arr));
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  const handleViewMsg = async e => {
    {
      !e.read &&
        (await fetch(
          `https://mailbox-client-41b43-default-rtdb.firebaseio.com/mails/${e.id}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({
              read: true
            })
          }
        ));
      getdata();
    }
    setView(() => e);
  };
  return (
    <Container fluid="md">
      {notFound && MsgList.length < 0
        ? <p>No Messaged Found</p>
        : <Table>
            {viewMsg
              ? <tbody>
                  <tr>
                    <td>
                      {viewMsg.content}
                    </td>
                  </tr>
                </tbody>
              : <tbody>
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
                </tbody>}
          </Table>}
    </Container>
  );
};
export default Inbox;
