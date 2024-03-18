import { useEffect, useState } from "react";
import { Container,Table } from "react-bootstrap";

const Inbox = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [notFound, setNotFound] = useState(false);
  const [mails, setMail] = useState([]);
  const getdata = async () => {
    const arr = [];
    const res = await fetch(
      `https://mailbox-client-41b43-default-rtdb.firebaseio.com/mails.json?orderBy="to"&startAt="${userEmail}"&endAt="${userEmail}"`
    );
    const data = await res.json();
    if (data.error) {
      setNotFound(true);
    } else {
      for (let value of Object.values(data)) {
        arr.push(value);
      }
      setMail(() => arr);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Container fluid="md">
      {notFound && mails.length < 0
        ? <p>No Messaged Found</p>
        : <Table>
            <tbody>
              {mails.map(mail =>
                <tr>
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
    </Container>
  );
};
export default Inbox;
