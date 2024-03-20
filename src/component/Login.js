import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import AlertComponent from "./AlertComponent";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthReducerAction } from "../store/AuthReducer";
function Login() {
  const dispatch = useDispatch();
  const emailInputRef = useRef(); //for taking input values
  const passInputRef = useRef();
  const [showAlert, setShowAlert] = useState({
    show: false,
    status: null,
    message: null
  }); //show user credentials is valid or not through Alert
  
  const SubmitHandler = async e => {
    e.preventDefault();

    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_Ru-yvMeeGWNsrOu9vYBNNjA6kMjvqLc",
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

    if (data.error) {
      setShowAlert({ show: true, status: "err", message: data.error.message });
      setTimeout(() => {
        setShowAlert({ show: false, status: "", message: "" });
      }, 3000);
    } else {
      setShowAlert({
        show: true,
        status: "success",
        message: "SuccessFully Logged In"
      });
      setTimeout(() => {
        setShowAlert({ show: false, status: "", message: "" });
      }, 3000);
      emailInputRef.current.value = "";
      passInputRef.current.value = "";
      dispatch(AuthReducerAction.addUser({userId : data.localId, userEmail: data.email}))
   
    }
  };
  return (
    <div>
      {showAlert.show &&
        <AlertComponent
          role="button"
          name="alert"
          status={showAlert.status}
          message={showAlert.message}
        />}
      <Card style={{ width: "19rem" }} className="mx-auto mb-2 mt-5">
        <Card.Body>
          <Card.Title> LogIn </Card.Title>
          <Form onSubmit={SubmitHandler}>
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
            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit">
                Log In
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
        Do not have an account ? <Link to="/signup">Sign Up</Link>
      </Alert>
    </div>
  );
}

export default Login;
