import Alert from "react-bootstrap/Alert";
const AlertComponent = ({ status, message }) => {
  return (
    <Alert variant={status === "err" ? "danger" : "success"}>
      {message}
    </Alert>
  );
};
export default AlertComponent;
