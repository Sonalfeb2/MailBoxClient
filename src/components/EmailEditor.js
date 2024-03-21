import { useRef, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import AlertComponent from "./AlertComponent";
import EditContainer from "./EditContainer";
function EmailEditor() {
  const receiverAddress = useRef();
  const senderSubject = useRef();
  const [contentState, setContentState] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleAlert = (status, message) => {
    setShowAlert({
      show: true,
      status: status,
      message: message
    });
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (contentState !== "") {
      const obj = {
        to: receiverAddress.current.value,
        subject: senderSubject.current.value,
        from: localStorage.getItem("userEmail"),
        content: contentState,
        read: false,
        date: new Date()
      };
      const res = await fetch(
        `https://mailbox-client-41b43-default-rtdb.firebaseio.com/receivers.json`,
        {
          method: "POST",
          body: JSON.stringify(obj)
        }
      )
      const req = await fetch(
        `https://mailbox-client-41b43-default-rtdb.firebaseio.com/senders.json`,
        {
          method: "POST",
          body: JSON.stringify(obj)
        }
      )
      const receiver = await res.json();
      const sender = await req.json();
      if (receiver.name && sender.name) {
        handleAlert("success", "Email Has SuccessFully Sent");
        receiverAddress.current.value = "";
        senderSubject.current.value = "";
        setContentState("");
        setIsEmpty(true);
        return;
      }
      handleAlert("err", "Email has failed");
    } else {
      handleAlert("err", "Email Should Have Content");
    }
  };

  return (
    <Container>
      {showAlert.show &&
        <AlertComponent
          status={showAlert.status}
          message={showAlert.message}
        />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="To"
            ref={receiverAddress}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Subject"
            ref={senderSubject}
            required
          />
        </Form.Group>
        <EditContainer
          handleContentState={e => setContentState(e)}
          isEmpty={isEmpty}
          setEmpty={() => setIsEmpty(!isEmpty)}
        />
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default EmailEditor;
