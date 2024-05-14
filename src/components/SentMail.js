// import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentData } from "../store/sentbox-action";
import ViewMsg from "./ViewMsg";
import { SideBarSliceActions } from "../store/sidebar-reducer";
import useCustomHook from "./UseCustomHook";
import { DateTime } from "luxon";
import 'font-awesome/css/font-awesome.min.css';

const SentMail = () => {
  const MsgList = useSelector(state => state.sentBox.list);

  const viewContent = useSelector(state => state.sideBarList.viewContent);
  const dispatch = useDispatch();
  const handleViewMsg = async e => {
    dispatch(SideBarSliceActions.showViewContent(e));
  };
  const [data] = useCustomHook("sentboxFetchData"); //custom hook
  console.log(data);
  // useEffect(
  //   () => {
  //     dispatch(fetchData());
  //   },
  //   [dispatch]
  // );

  const handleDelete = async e => {
    const res = await fetch(
      `https://mail-box-80520-default-rtdb.firebaseio.com/senders/${e}.json`,
      {
        method: "DELETE"
      }
    );
    const data = await res.json();
    if (data) {
      console.log("Data Deleted SuccessFully");
    }

    dispatch(fetchSentData());
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
export default SentMail;
