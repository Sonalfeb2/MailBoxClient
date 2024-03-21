import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import AlertComponent from "./AlertComponent";
import { Link } from "react-router-dom";
function SignUp() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const cpassInputRef = useRef();
  const [showAlert, setShowAlert] = useState({
    show: false,
    status: null,
    message: null
  });

  const submitHandler = async e => {
    e.preventDefault();
    if (passInputRef.current.value === cpassInputRef.current.value) {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_Ru-yvMeeGWNsrOu9vYBNNjA6kMjvqLc",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passInputRef.current.value,
            returnSecureToken: true
          })
        }
      );
      const data = await res.json();
      if (data.kind) {
        console.log("User has successfully signed up.");
      }
    } else {
      setShowAlert({
        show: true,
        status: "err",
        message: "Password should be match with confirm Password"
      });
      setTimeout(() => {
        setShowAlert({ show: false, status: "", message: "" });
      }, 3000);
    }
    emailInputRef.current.value = "";
    passInputRef.current.value = "";
    cpassInputRef.current.value = "";
  };
  return (
    <div>
      {showAlert.show &&
        <AlertComponent
          status={showAlert.status}
          message={showAlert.message}
        />}
      <Card style={{ width: "19rem" }} className="mx-auto mb-2 mt-5">
        <Card.Body>
          <Card.Title> Sign Up </Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passInputRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={cpassInputRef}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit">
                SignUp
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Alert
        key="primary"
        variant="primary"
        style={{ width: "19rem" }}
        className="mx-auto"
      >
        Have an account ? <Link to="/login">Login</Link>
      </Alert>
    </div>
  );
}

export default SignUp;
