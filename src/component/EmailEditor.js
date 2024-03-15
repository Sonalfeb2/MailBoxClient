import { useRef, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AlertComponent from "./AlertComponent";
import EditContainer from "./EditContainer";
function EmailEditor({ show, onHide }) {
  const receiverAddress = useRef();
  const senderSubject = useRef();
  const [contentState, setContentState] = useState("");
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
        content: contentState
      };
      const res = await fetch(
        "https://mailbox-client-41b43-default-rtdb.firebaseio.com/mails.json",
        {
          method: "POST",
          body: JSON.stringify(obj)
        }
      );
      const data = await res.json();
      if (data.name) {
        handleAlert("success", "Email Has SuccessFully Sent");
        return;
      }
      handleAlert("err", "Email has failed");
    } else {
      handleAlert("err", "Email Should Have Content");
    }
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      aria-labelledby="example-custom-modal-styling-title"
    >
      {showAlert.show &&
        <AlertComponent
          status={showAlert.status}
          message={showAlert.message}
        />}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="pb-0">
          <Modal.Title className="w-100">
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Control
                  className="border-0"
                  type="email"
                  placeholder="To"
                  ref={receiverAddress}
                  required
                />
              </Col>
            </Form.Group>
          </Modal.Title>
        </Modal.Header>
        <Modal.Header className="pb-0">
          <Modal.Title className="w-100">
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  className="border-0"
                  ref={senderSubject}
                  required
                />
              </Col>
            </Form.Group>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body size="lg">
          <EditContainer handleContentState={e => setContentState(e)} />

          {/* <Form.Control as="textarea" rows={12} className='border-0' placeholder='write your mail here...'/> */}
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "flex-start" }}>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EmailEditor;
