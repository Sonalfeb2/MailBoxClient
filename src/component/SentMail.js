import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/SentBoxAction";
import ViewMsg from "./ViewMsg";
import { SideBarSliceActions } from "../store/SideBarReducer";
const SentMail = () => {
  const MsgList = useSelector(state => state.sentBox.list);

  const viewContent = useSelector(state => state.sideBarList.viewContent);
  const dispatch = useDispatch();
  const handleViewMsg = async e => {
   
    dispatch(SideBarSliceActions.showViewContent(e));
  };

  useEffect(
    () => {
      dispatch(fetchData());
    },
    [dispatch]
  );

  const handleDelete = async e => {
    const res = await fetch(
      `https://mailbox-client-41b43-default-rtdb.firebaseio.com/senders/${e}.json`,
      {
        method: "DELETE"
      }
    );
    const data = await res.json();
    if(data){
        console.log('Data Deleted SuccessFully')
    }

    dispatch(fetchData());
  };
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
                        /// unread msg call the function for mark read as true in db
                      >
                        <td>
                          {mail.to.split("@")[0]}
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
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(mail.id)}
                          >
                            Delete
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
export default SentMail;
